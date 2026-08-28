import axiosClient from './axiosClient';

const orderApi = {
    getAllOrders: (params) => {
        // Tham số truyền vào có thể là { page: 0, size: 10, keyword: '...' }
        return axiosClient.get('/orders', { params });
    },
    getOrderById: (id) => {
        return axiosClient.get(`/orders/${id}`);
    },
    createOrder: (data) => {
        return axiosClient.post('/orders', data);
    },
    updateOrder: (id, data) => {
        return axiosClient.put(`/orders/${id}`, data);
    },
    deleteOrder: (id) => {
        return axiosClient.delete(`/orders/${id}`);
    }
};

export default orderApi; 