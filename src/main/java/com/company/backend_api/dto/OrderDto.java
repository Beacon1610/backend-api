package com.company.backend_api.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class OrderDto {
    // @NotBlank: Bắt buộc không được để null, không được rỗng và không được toàn dấu cách
    @NotBlank(message = "Tên sản phẩm không được để trống!")
    // @Size: Giới hạn độ dài thực tế của chuỗi
    @Size(min = 2, max = 100, message = "Tên sản phẩm phải từ 2 đến 100 ký tự!")
    private String productName;

    // Spring Boot CẦN Getter và Setter để tự động chuyển JSON thành Java Object
    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}
