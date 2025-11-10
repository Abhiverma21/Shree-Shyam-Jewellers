import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/OrderModel";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Create new order
    const order = new Order({
      productId: body.productId,
      product: body.product,
      customer: body.customer,
      status: "pending",
      paymentMethod: body.paymentMethod,
      orderDate: new Date()
    });

    await order.save();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: order._id
    });

  } catch (error) {
    console.error("Error creating order:", error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { 
          success: false, 
          message: "Order validation failed", 
          errors: validationErrors 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();

    // Support query params for admin listing: page, limit, q (search), status, sort, latest
    const url = new URL(request.url);
    const latest = url.searchParams.get('latest');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '20', 10);
    const q = url.searchParams.get('q') || '';
    const status = url.searchParams.get('status') || '';
    const sortParam = url.searchParams.get('sort') || '-createdAt';

    if (latest) {
      const orders = await Order.find().sort({ createdAt: -1 }).limit(1);
      const order = orders && orders.length ? orders[0] : null;
      return NextResponse.json({ success: true, order });
    }

    const filters = {};
    if (status) filters.status = status;

    if (q) {
      const regex = { $regex: q, $options: 'i' };
      filters.$or = [
        { 'customer.fullName': regex },
        { 'customer.email': regex },
        { 'product.name': regex },
        { _id: q }
      ];
    }

    const skip = (Math.max(page, 1) - 1) * limit;
    const sort = {};
    // support simple sort strings like '-createdAt' or 'orderDate'
    if (sortParam.startsWith('-')) sort[sortParam.slice(1)] = -1;
    else sort[sortParam] = 1;

    const [orders, total] = await Promise.all([
      Order.find(filters).sort(sort).skip(skip).limit(limit),
      Order.countDocuments(filters)
    ]);

    const pages = Math.ceil(total / limit) || 1;
    return NextResponse.json({ success: true, orders, total, page, pages });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}