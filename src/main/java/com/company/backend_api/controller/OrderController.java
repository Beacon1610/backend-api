package com.company.backend_api.controller;

import com.company.backend_api.dto.OrderDto;
import com.company.backend_api.service.OrderService;
import com.company.backend_api.entity.OrderEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;

import java.util.List;
import com.company.backend_api.dto.OrderDto;
// Báo cho Spring Boot biết đây là nơi tiếp nhận API
@RestController
// Định nghĩa URL gốc cho toàn bộ class này
@RequestMapping("/api/orders")
public class OrderController {
    // 1. Khai báo sự phụ thuộc vào "Đầu bếp"
    private final OrderService orderService;

    // 2. Tiêm (Inject) qua Constructor.
    // Spring Boot sẽ tự động lấy Đầu bếp từ bộ nhớ nhét vào đây.
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderEntity> getAllOrders() {
        return  orderService.getAllOrders();
    }

    @PostMapping
    public String createOrder( @Valid @RequestBody OrderDto newOrder) {
        // 3. Bồi bàn không tự làm nữa, mà gọi Đầu bếp ra xử lý
        return orderService.processNewOrder(newOrder);
    }
    // API: GET /api/orders/{id}
    @GetMapping("/{id}")
    public OrderEntity getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
    // API: PUT /api/orders/{id} - Dùng để Cập nhật
    // Chú ý: Ta vẫn dùng @Valid để chặn dữ liệu rác khi user sửa đơn hàng!
    @PutMapping("/{id}")
    public OrderEntity updateOrder(@PathVariable Long id, @Valid @RequestBody OrderDto updatedData) {
        return orderService.updateOrder(id, updatedData);
    }

    // API: DELETE /api/orders/{id} - Dùng để Xóa
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return "Đã xóa thành công đơn hàng số: " + id;
    }
    // API: PATCH /api/orders/{id}
    @PatchMapping("/{id}")
    public OrderEntity patchOrder(@PathVariable Long id, @RequestBody OrderDto patchData) {
        // Bí kíp doanh nghiệp: Thường với PATCH, ta KHÔNG dùng @Valid ở đây.
        // Vì Frontend được quyền gửi thiếu các trường (để giữ nguyên giá trị cũ),
        // nếu dùng @Valid nó sẽ báo lỗi "Không được để trống" ngay!
        return orderService.patchOrder(id, patchData);
    }
}