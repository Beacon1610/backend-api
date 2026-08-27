package com.company.backend_api.service;

import com.company.backend_api.dto.OrderDto;
import com.company.backend_api.entity.OrderEntity;
import com.company.backend_api.exception.ResourceNotFoundException;
import com.company.backend_api.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OrderServiceTest {

    // 1. Giả lập (Mock) OrderRepository để không kết nối Database thật
    @Mock
    private OrderRepository orderRepository;

    // 2. Tiêm đối tượng giả lập vào OrderService
    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // --- TEST 1: Tạo đơn hàng thành công ---
    @Test
    void testProcessNewOrder_Success() {
        // Arrange
        OrderDto dto = new OrderDto();
        dto.setProductName("Laptop Gaming");

        OrderEntity savedEntity = new OrderEntity();
        savedEntity.setId(10L);
        savedEntity.setProductName("Laptop Gaming");

        // Dạy repository giả: khi gọi save(), trả về savedEntity có ID = 10
        when(orderRepository.save(any(OrderEntity.class))).thenReturn(savedEntity);

        // Act
        String result = orderService.processNewOrder(dto);

        // Assert
        assertNotNull(result);
        assertTrue(result.contains("10")); // Kiểm tra xem thông điệp có chứa ID mới tạo không
        verify(orderRepository, times(1)).save(any(OrderEntity.class));
    }

    // --- TEST 2: Lấy đơn hàng theo ID thành công ---
    @Test
    void testGetOrderById_Success() {
        // Arrange
        Long id = 1L;
        OrderEntity entity = new OrderEntity();
        entity.setId(id);
        entity.setProductName("Bàn phím cơ");

        when(orderRepository.findById(id)).thenReturn(Optional.of(entity));

        // Act
        OrderEntity result = orderService.getOrderById(id);

        // Assert
        assertNotNull(result);
        assertEquals(id, result.getId());
        assertEquals("Bàn phím cơ", result.getProductName());
    }

    // --- TEST 3: Lấy đơn hàng theo ID thất bại (Ném lỗi 404 / ResourceNotFoundException) ---
    @Test
    void testGetOrderById_NotFound() {
        // Arrange
        Long id = 99L;
        when(orderRepository.findById(id)).thenReturn(Optional.empty());

        // Act & Assert: Kỳ vọng hàm này phải ném ra ResourceNotFoundException
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            orderService.getOrderById(id);
        });

        assertTrue(exception.getMessage().contains("Không tìm thấy đơn hàng với ID: 99"));
    }

    // --- TEST 4: Xóa đơn hàng thành công ---
    @Test
    void testDeleteOrder_Success() {
        // Arrange
        Long id = 1L;
        OrderEntity entity = new OrderEntity();
        entity.setId(id);

        // Tìm thấy đơn hàng để xóa
        when(orderRepository.findById(id)).thenReturn(Optional.of(entity));
        doNothing().when(orderRepository).delete(entity);

        // Act
        assertDoesNotThrow(() -> {
            orderService.deleteOrder(id);
        });

        // Assert: Xác nhận hàm delete đã được gọi đúng 1 lần
        verify(orderRepository, times(1)).delete(entity);
    }
}