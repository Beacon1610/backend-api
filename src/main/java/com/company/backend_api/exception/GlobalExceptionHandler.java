package com.company.backend_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.HashMap;
import java.util.Map;

// Đánh dấu đây là "Bác sĩ trưởng khoa", chuyên bắt mọi lỗi từ tất cả các Controller
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Hàm này sẽ tự động chạy khi dữ liệu gửi lên bị chặn bởi @Valid
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        // Lấy ra tất cả các lỗi và nhét vào một cái Map (Từ điển)
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return errors;
    }
    // Bắt lỗi ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    // Trả về mã lỗi 404 Not Found cho Frontend
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(ResourceNotFoundException ex) {
        return ex.getMessage(); // Trả về đúng câu chữ mà chúng ta sẽ viết ở Service
    }
}