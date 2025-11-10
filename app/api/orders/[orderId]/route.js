import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/models/OrderModel";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const orderId = params.orderId;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order
    });

  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const orderId = params.orderId;
    const body = await request.json();

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    // Allow updating limited fields for safety
    const allowed = ['status', 'paymentMethod', 'paidAt', 'deliveredAt'];
    Object.keys(body).forEach(key => {
      if (allowed.includes(key)) {
        order[key] = body[key];
      }
    });

    await order.save();
    return NextResponse.json({ success: true, message: 'Order updated', order });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ success: false, message: 'Failed to update order' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const orderId = params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    await Order.deleteOne({ _id: orderId });
    return NextResponse.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete order' }, { status: 500 });
  }
}