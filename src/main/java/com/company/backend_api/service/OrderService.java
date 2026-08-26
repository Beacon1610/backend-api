package com.company.backend_api.service;

import com.company.backend_api.dto.OrderDto;
import com.company.backend_api.entity.OrderEntity;
import com.company.backend_api.repository.OrderRepository;
import org.springframework.stereotype.Service;
import com.company.backend_api.exception.ResourceNotFoundException;

import java.util.List;

// Annotation @Service báo cho Spring Boot biết đây là "Đầu bếp",
// hãy tạo sẵn 1 instance (object) của class này và bỏ vào Container (bộ nhớ).
@Service
public class OrderService {
    private final OrderRepository orderRepository;

    // 2. Tiêm (Inject) "Thủ kho" thông qua Constructor
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    public String processNewOrder(OrderDto newOrder) {
// BƯỚC 3: Chuyển DTO (Từ Frontend gửi lên) thành Entity (Khuôn của Database)
        OrderEntity entity = new OrderEntity();
        entity.setProductName(newOrder.getProductName());
        // BƯỚC 4: Gọi Thủ kho để lưu vào Database. Hàm .save() sẽ trả về Entity có chứa ID mới tạo.
        OrderEntity savedEntity = orderRepository.save(entity);

        System.out.println("Đã lưu đơn hàng vào Database với ID: " + savedEntity.getId());
        return "Tạo đơn hàng thành công! Mã đơn hàng (ID) của bạn là: " + savedEntity.getId();
    }
  //Lấy danh sách đơn hàng
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
        // Hàm findAll() là do Spring Data JPA viết sẵn, tương đương lệnh: SELECT * FROM orders;
    }
    //Lấy đơn hàng chi tiêt theo ID
    public OrderEntity getOrderById(Long id) {
        // Hàm findById trả về một cái Hộp (Optional).
        // Nếu hộp có đồ, ta lấy ra. Nếu hộp rỗng, ta NÉM thẳng cái lỗi vừa tạo ra ngoài!
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));
    }
    // 1. Hàm Cập nhật (Sửa tên sản phẩm)
    public OrderEntity updateOrder(Long id, OrderDto updatedData) {
        // Bước 1.1: Tìm xem đơn hàng có tồn tại không (Nếu không có, ném ngay lỗi 404)
        OrderEntity existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));

        // Bước 1.2: Lấy dữ liệu mới đè lên dữ liệu cũ
        existingOrder.setProductName(updatedData.getProductName());

        // Bước 1.3: Lưu lại vào Database
        return orderRepository.save(existingOrder);
    }

    // 2. Hàm Xóa đơn hàng
    public void deleteOrder(Long id) {
        // Bước 2.1: Vẫn phải kiểm tra xem nó có tồn tại không đã rồi mới xóa
        OrderEntity existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));

        // Bước 2.2: Gọi Thủ kho xóa nó đi
        orderRepository.delete(existingOrder);
    }
    // 3. Hàm Vá dữ liệu (PATCH)
    public OrderEntity patchOrder(Long id, OrderDto patchData) {
        OrderEntity existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));

        // Kiểm tra: Frontend có gửi productName lên không? Có thì mới đè vào, null thì bỏ qua giữ nguyên đồ cũ.
        if (patchData.getProductName() != null) {
            existingOrder.setProductName(patchData.getProductName());
        }

        return orderRepository.save(existingOrder);
    }
}