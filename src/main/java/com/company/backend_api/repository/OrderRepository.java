package com.company.backend_api.repository;

import com.company.backend_api.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
// @Repository đánh dấu đây là "Thủ kho"
// JpaRepository<Tên_Bảng, Kiểu_dữ_liệu_của_Khóa_chính>
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

    // Không cần viết gì ở đây cả, Spring Boot đã làm sẵn các hàm save(), findAll(), findById()... cho bạn rồi!
    // Hàm mới: Tìm kiếm theo tên sản phẩm (không phân biệt hoa thường) và có phân trang
    Page<OrderEntity> findByProductNameContainingIgnoreCase(String productName, Pageable pageable);
}