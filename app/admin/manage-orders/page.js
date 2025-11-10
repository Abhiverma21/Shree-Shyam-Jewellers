"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FaSearch, FaTrash, FaEdit, FaDownload, FaSyncAlt } from "react-icons/fa";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [activeOrder, setActiveOrder] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");

  const statusOptions = ["", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

  const fetchOrders = async (opts = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", opts.page || page);
      params.set("limit", opts.limit || limit);
      if (opts.q !== undefined ? opts.q : q) params.set("q", opts.q !== undefined ? opts.q : q);
      if (opts.status !== undefined ? opts.status : statusFilter) params.set("status", opts.status !== undefined ? opts.status : statusFilter);

      const res = await fetch(`/api/orders?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
        setTotal(data.total || 0);
        setPage(data.page || 1);
        setPages(data.pages || 1);
      } else {
        console.error('Failed fetching orders', data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = () => {
    setPage(1);
    fetchOrders({ page: 1, q });
  };

  const clearFilters = () => {
    setQ("");
    setStatusFilter("");
    setPage(1);
    fetchOrders({ page: 1, q: "", status: "" });
  };

  const toggleSelect = (id) => {
    const copy = new Set(selected);
    if (copy.has(id)) copy.delete(id);
    else copy.add(id);
    setSelected(copy);
  };

  const selectAllOnPage = () => {
    const copy = new Set(selected);
    orders.forEach(o => copy.add(String(o._id)));
    setSelected(copy);
  };

  const clearSelection = () => setSelected(new Set());

  const openDetails = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();
      if (data.success) setActiveOrder(data.order);
      else console.error(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders({ page });
        setActiveOrder(data.order);
      } else console.error(data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order? This action cannot be undone.')) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchOrders({ page });
        clearSelection();
        if (activeOrder && String(activeOrder._id) === String(id)) setActiveOrder(null);
      } else console.error(data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const bulkDelete = async () => {
    if (selected.size === 0) return alert('Select orders first');
    if (!confirm(`Delete ${selected.size} order(s)?`)) return;
    try {
      setLoading(true);
      // delete sequentially to avoid complicated batch API (simple and safe)
      for (const id of Array.from(selected)) {
        await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      }
      fetchOrders({ page });
      clearSelection();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const exportCSV = () => {
    const rows = [];
    rows.push(['Order ID','Customer','Email','Phone','Status','Amount','Product','Order Date']);
    orders.forEach(o => {
      rows.push([
        o._id,
        o.customer?.fullName || '',
        o.customer?.email || '',
        o.customer?.phone || '',
        o.status || '',
        o.product?.price || '',
        o.product?.name || '',
        o.orderDate || ''
      ]);
    });
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_page_${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pageNumbers = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= pages; i++) arr.push(i);
    return arr;
  }, [pages]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
        <div className="flex gap-2">
          <button onClick={() => fetchOrders({ page })} className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center gap-2"><FaSyncAlt/> Refresh</button>
          <button onClick={exportCSV} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><FaDownload/> Export</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex items-center border rounded-lg px-3 py-2 gap-2 w-full sm:w-3/4 focus-within:ring-2 focus-within:ring-blue-300">
            <FaSearch className="text-gray-400" />
            <label htmlFor="admin-search" className="sr-only">Search orders</label>
            <input
              id="admin-search"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              onKeyDown={(e)=>{ if (e.key === 'Enter') { e.preventDefault(); onSearch(); } }}
              placeholder="Search by name, email, product or order id — press Enter to search"
              className="outline-none w-full text-sm"
              aria-label="Search orders by name, email, product or id"
            />
            {q && (
              <button onClick={()=>{ setQ(''); setPage(1); fetchOrders({ page:1, q: '' }); }} className="text-gray-500 hover:text-gray-800 px-2 py-1">✕</button>
            )}
            <button onClick={onSearch} className="text-sm text-white bg-blue-600 px-3 py-1 rounded ml-2">Search</button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select value={statusFilter} onChange={(e)=>{setStatusFilter(e.target.value); setPage(1); fetchOrders({ page:1, status: e.target.value });}} className="border rounded px-2 py-1 text-sm">
              {statusOptions.map(s => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
            </select>
            <select value={limit} onChange={(e)=>{const l = parseInt(e.target.value,10); setLimit(l); setPage(1); fetchOrders({ page:1, limit: l });}} className="border rounded px-2 py-1 text-sm">
              {[6,12,24,50].map(n => <option key={n} value={n}>{n} per page</option>)}
            </select>
            <button onClick={clearFilters} className="px-3 py-1 border rounded text-sm">Clear</button>
          </div>
        </div>

        <div className="mt-2 text-xs text-gray-500">Tip: Type a name, email, product or order id and press Enter to quickly search. Use the status dropdown to narrow results.</div>

        {/** Visible filter chips for clarity */}
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {q && <div className="px-2 py-1 bg-blue-50 text-blue-800 rounded text-sm">Search: &quot;{q}&quot; <button className="ml-2 text-blue-600" onClick={()=>{ setQ(''); setPage(1); fetchOrders({ page:1, q:'' }); }}>✕</button></div>}
          {statusFilter && <div className="px-2 py-1 bg-yellow-50 text-yellow-800 rounded text-sm">Status: {statusFilter} <button className="ml-2 text-yellow-700" onClick={()=>{ setStatusFilter(''); setPage(1); fetchOrders({ page:1, status: '' }); }}>✕</button></div>}
          {(q || statusFilter) && <button onClick={clearFilters} className="text-sm text-gray-600 underline">Clear all filters</button>}
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" onChange={(e)=> e.target.checked ? selectAllOnPage() : clearSelection()} />
            <button onClick={bulkDelete} className="text-sm text-red-600">Delete Selected ({selected.size})</button>
          </div>
          <div className="text-sm text-gray-600">Total: {total} orders</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {loading && <div className="col-span-full text-center text-gray-500">Loading...</div>}
          {!loading && orders.length === 0 && <div className="col-span-full text-center p-8">No orders found.</div>}
          {orders.map(order => (
            <div key={order._id} className="border rounded p-3 shadow-sm flex flex-col">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">ID: <span className="font-mono text-xs">{String(order._id).slice(-8)}</span></div>
                  <div className="font-semibold">{order.customer?.fullName || '—'}</div>
                  <div className="text-sm text-gray-600">{order.customer?.email || ''}</div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>{order.status}</div>
                  <div className="mt-2 text-lg font-semibold">₹{order.product?.price?.toLocaleString()}</div>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600 flex-1">
                <div><b>Product:</b> {order.product?.name || '—'}</div>
                <div><b>Phone:</b> {order.customer?.phone || '—'}</div>
                <div className="mt-2 text-xs text-gray-500">{new Date(order.createdAt || order.orderDate || Date.now()).toLocaleString()}</div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <input type="checkbox" checked={selected.has(String(order._id))} onChange={()=>toggleSelect(String(order._id))} />
                <button onClick={()=>openDetails(order._id)} className="px-2 py-1 bg-blue-600 text-white rounded text-sm flex items-center gap-2"><FaEdit/> Details</button>
                <button onClick={()=>updateStatus(order._id, order.status === 'cancelled' ? 'pending' : 'cancelled')} className="px-2 py-1 border rounded text-sm">{order.status === 'cancelled' ? 'Un-cancel' : 'Cancel'}</button>
                <button onClick={()=>deleteOrder(order._id)} className="ml-auto text-sm text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t flex items-center justify-between">
          <div>
            Page {page} of {pages}
          </div>
          <div className="flex items-center gap-2">
            <button disabled={page<=1} onClick={()=>{ const p=page-1; setPage(p); fetchOrders({ page: p });}} className="px-3 py-1 border rounded">Prev</button>
            {pageNumbers.slice(0,10).map(pn => (
              <button key={pn} onClick={()=>{ setPage(pn); fetchOrders({ page: pn }); }} className={`px-2 py-1 rounded ${pn===page ? 'bg-gray-800 text-white' : 'bg-white border'}`}>{pn}</button>
            ))}
            <button disabled={page>=pages} onClick={()=>{ const p=page+1; setPage(p); fetchOrders({ page: p });}} className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>

      {/* Details modal / drawer */}
      {activeOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative">
            <button onClick={()=>setActiveOrder(null)} className="absolute right-3 top-3 text-gray-600">Close</button>
            <h2 className="text-xl font-semibold mb-3">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Order ID</div>
                <div className="font-mono text-sm mb-2">{activeOrder._id}</div>

                <div className="text-sm text-gray-500">Customer</div>
                <div className="font-medium">{activeOrder.customer?.fullName}</div>
                <div className="text-sm">{activeOrder.customer?.email} · {activeOrder.customer?.phone}</div>
                <div className="mt-2 text-sm text-gray-600">{activeOrder.customer?.address}, {activeOrder.customer?.city}, {activeOrder.customer?.state} {activeOrder.customer?.pincode}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Product</div>
                <div className="font-medium">{activeOrder.product?.name}</div>
                <div className="text-sm">Price: ₹{activeOrder.product?.price?.toLocaleString()}</div>
                <div className="mt-2">
                  <label className="text-sm block mb-1">Change status</label>
                  <select value={editingStatus || activeOrder.status} onChange={(e)=>setEditingStatus(e.target.value)} className="border rounded px-2 py-1 w-full">
                    {statusOptions.map(s => <option key={s} value={s}>{s || 'Select status'}</option>)}
                  </select>
                  <div className="flex gap-2 mt-3">
                    <button onClick={()=>{ updateStatus(activeOrder._id, editingStatus || activeOrder.status); }} className="px-3 py-1 bg-blue-600 text-white rounded">Save</button>
                    <button onClick={()=>{ setEditingStatus(''); setActiveOrder(null); fetchOrders({ page }); }} className="px-3 py-1 border rounded">Close</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Raw</h3>
              <pre className="max-h-48 overflow-auto text-xs bg-gray-50 p-3 rounded mt-2">{JSON.stringify(activeOrder, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
