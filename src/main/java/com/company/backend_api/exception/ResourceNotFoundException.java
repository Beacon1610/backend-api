package com.company.backend_api.exception;

// Kế thừa RuntimeException để biến class này thành một loại "Lỗi" trong Java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}