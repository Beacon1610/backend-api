package com.company.backend_api.entity;

import jakarta.persistence.*;
import java.io.Serializable;
// Báo cho JPA biết class này sẽ biến thành 1 Bảng (Table) trong Database
@Entity
@Table(name = "orders")
public class OrderEntity implements Serializable {

    // Đây là Khóa chính (Primary Key), tự động tăng (Auto Increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tên cột trong bảng
    @Column(name = "product_name")
    private String productName;

    // --- Bắt buộc phải tạo Getter / Setter cho Database ---
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }
}