package com.wrapbrand.controller;

import com.wrapbrand.dto.AdminStatsDTO;
import com.wrapbrand.dto.UserDTO;
import com.wrapbrand.entity.Order;
import com.wrapbrand.entity.Product;
import com.wrapbrand.repository.OrderRepository;
import com.wrapbrand.repository.ProductRepository;
import com.wrapbrand.repository.UserRepository;
import com.wrapbrand.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .map(UserDTO::fromEntity)
                .collect(Collectors.toList()));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        long users = userRepository.count();
        long products = productRepository.count();
        List<Order> orders = orderRepository.findAll();
        long orderCount = orders.size();
        double revenue = orders.stream()
                .mapToDouble(o -> o.getTotalAmount().doubleValue())
                .sum();

        return ResponseEntity.ok(new AdminStatsDTO(users, orderCount, revenue, products));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> payload) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(payload.get("status"));
        return ResponseEntity.ok(orderRepository.save(order));
    }
}
