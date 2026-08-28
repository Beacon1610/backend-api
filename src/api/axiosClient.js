import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'http://localhost:8081/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Chặn request lại để gắn thẻ từ (Token) trước khi gửi đi
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token') || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token.replace(/^Bearer\s+/i, '')}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Tùy chọn: Xử lý lỗi trả về (Ví dụ: token hết hạn (401) thì tự động văng ra trang Login)
axiosClient.interceptors.response.use(
    (response) => {
        return response.data; // Chỉ lấy phần data, bỏ qua các thông tin râu ria của axios
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Ép người dùng về trang đăng nhập
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
