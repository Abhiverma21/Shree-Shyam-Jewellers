'use client';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaBoxOpen, FaTruck, FaMapMarkerAlt, FaPrint } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
// Note: avoid using `useSearchParams` here because it can cause a CSR bailout during
// prerender and requires a Suspense boundary. We'll read the search params from
// window.location inside the client-side effect instead.

const Order = () => {
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    customerName: '',
    orderDate: '',
    deliveryAddress: '',
    totalAmount: 0,
    items: [],
    paymentMethod: '',
    estimatedDelivery: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderById = async (id) => {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch order: ${res.status} ${text}`);
      }
      const data = await res.json();
      if (!data.success || !data.order) throw new Error(data.message || 'Order not found');
      return data.order;
    };

    const fetchLatestOrder = async () => {
      const res = await fetch(`/api/orders?latest=1`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch latest order: ${res.status} ${text}`);
      }
      const data = await res.json();
      if (!data.success || !data.order) throw new Error(data.message || 'No recent orders found');
      return data.order;
    };

    const load = async () => {
      try {
        setLoading(true);
        setError('');

        // Read orderId from URL search params in a client-safe way.
        // This code runs only in the browser because it's inside useEffect.
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const orderIdParam = params ? params.get('orderId') : null;

        const o = orderIdParam ? await fetchOrderById(orderIdParam) : await fetchLatestOrder();

        const mapped = {
          orderId: o._id,
          customerName: o.customer?.fullName || '',
          orderDate: o.orderDate ? new Date(o.orderDate).toLocaleString() : '',
          deliveryAddress: `${o.customer?.address || ''}, ${o.customer?.city || ''}, ${o.customer?.state || ''} ${o.customer?.pincode || ''}`,
          totalAmount: o.product?.price || 0,
          items: [
            {
              id: o.productId,
              name: o.product?.name || 'Product',
              price: o.product?.price || 0,
              quantity: 1,
              image: o.product?.image || '/images/placeholder.png'
            }
          ],
          paymentMethod: o.paymentMethod || '',
          estimatedDelivery: o.status === 'shipped' ? 'In transit' : '3-7 business days',
          status: o.status || 'pending'
        };

        setOrderDetails(mapped);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handlePrintOrder = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Order Success Header */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Thank You for Your Order!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your order has been successfully placed and confirmed
          </p>
        </div>
        {/* Global loading / error banner */}
        {loading && (
          <div className="mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-md text-center">
            Fetching your order…
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Order Details Card */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Order #{orderDetails.orderId}
                </h2>
                <p className="text-gray-600 mt-1">
                  Placed on {orderDetails.orderDate}
                </p>
              </div>
              <button
                onClick={handlePrintOrder}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <FaPrint className="mr-2" />
                Print Order
              </button>
            </div>
          </div>

          {/* Order Status Timeline */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="text-white" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">Confirmed</p>
              </div>
              <div className="flex-1 h-1 bg-green-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaBoxOpen className="text-white" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">Processing</p>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaTruck className="text-white" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">Shipped</p>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">Delivered</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Order Items
            </h3>
            
            {!loading && !error && orderDetails.items.map((item) => (
              <div
                key={String(item.id)}
                className="flex items-center py-4 border-b border-gray-100 last:border-0"
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  {/* Use Next.js Image for better performance. unoptimized used to avoid remote domain config if needed. */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover object-center"
                    unoptimized
                  />
                </div>
                <div className="ml-6 flex-1">
                  <h4 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-medium text-gray-900">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-medium">
                ₹{orderDetails.totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900 font-medium">Free</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-4">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-lg font-semibold text-gray-900">
                ₹{orderDetails.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Delivery Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Shipping Address
                </h4>
                <p className="mt-2 text-gray-800">{orderDetails.deliveryAddress}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Estimated Delivery
                </h4>
                <p className="mt-2 text-gray-800">
                  {orderDetails.estimatedDelivery}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors mr-4"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;
