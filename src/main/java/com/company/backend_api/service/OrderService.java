package com.company.backend_api.service;

import com.company.backend_api.dto.OrderDto;
import com.company.backend_api.entity.OrderEntity;
import com.company.backend_api.repository.OrderRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import com.company.backend_api.exception.ResourceNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderService {

    // Khởi tạo công cụ ghi log chuẩn cho class
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @CacheEvict(value = "ordersCache", allEntries = true)
    public String processNewOrder(OrderDto newOrder) {
        OrderEntity entity = new OrderEntity();
        entity.setProductName(newOrder.getProductName());
        OrderEntity savedEntity = orderRepository.save(entity);

        // Ghi log ra console thay vì dùng System.out.println
        log.info("Đã lưu đơn hàng vào Database với ID: {}", savedEntity.getId());

        return "Tạo đơn hàng thành công! Mã đơn hàng (ID) của bạn là: " + savedEntity.getId();
    }

    @Cacheable(value = "ordersCache")
    public Page<OrderEntity> getAllOrders(String keyword, int page, int size) {
        PageRequest pageable = PageRequest.of(page, size);

        if (keyword != null && !keyword.isEmpty()) {
            return orderRepository.findByProductNameContainingIgnoreCase(keyword, pageable);
        } else {
            return orderRepository.findAll(pageable);
        }
    }

    // SỬA LẠI THÀNH @Cacheable ĐỂ LƯU CACHE CHO ĐƠN HÀNG CHI TIẾT
    @Cacheable(value = "orderDetailCache", key = "#id")
    public OrderEntity getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));
    }

    @CacheEvict(value = "ordersCache", allEntries = true)
    public OrderEntity updateOrder(Long id, OrderDto updatedData) {
        OrderEntity existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));

        existingOrder.setProductName(updatedData.getProductName());
        return orderRepository.save(existingOrder);
    }

    @CacheEvict(value = "ordersCache", allEntries = true)
    public void deleteOrder(Long id) {
        OrderEntity existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));

        orderRepository.delete(existingOrder);
    }

    @CacheEvict(value = "ordersCache", allEntries = true)
    public OrderEntity patchOrder(Long id, OrderDto patchData) {
        OrderEntity existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));

        if (patchData.getProductName() != null) {
            existingOrder.setProductName(patchData.getProductName());
        }

        return orderRepository.save(existingOrder);
    }
}