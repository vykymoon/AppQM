// Epic 6 - Order Management for the POS system
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../FireBase'; // Adjust the import based on your project structure
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
            const fetchedOrders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setOrders(fetchedOrders);
        });
        return unsubscribe;
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { status: newStatus });
            Swal.fire({
                title: `Order ${newStatus === 'Completed' ? 'Completed' : 'Canceled'}!`,
                text: `Order ${orderId} status has been updated to ${newStatus}.`,
                icon: newStatus === 'Completed' ? 'success' : 'error',
                confirmButtonColor: newStatus === 'Completed' ? '#16a34a' : '#dc2626'
            });
        } catch (error) {
            toast.error('Error updating order status. Please try again.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Order Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => (
                    <div key={order.id} className="shadow-lg rounded-2xl p-4 transition-transform transform hover:scale-105">
                        <div>
                            <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
                            <p><strong>Customer:</strong> {order.customerName}</p>
                            <p><strong>Total:</strong> ${order.total}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <button onClick={() => updateOrderStatus(order.id, 'Completed')} className="mt-2 w-full bg-green-500 hover:bg-green-600">Complete Order</button>
                            <button onClick={() => updateOrderStatus(order.id, 'Canceled')} className="mt-2 w-full bg-red-500 hover:bg-red-600">Cancel Order</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManagement;
