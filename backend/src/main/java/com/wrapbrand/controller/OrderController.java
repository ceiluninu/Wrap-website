package com.wrapbrand.controller;

import com.wrapbrand.entity.Order;
import com.wrapbrand.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(
            Authentication authentication,
            @RequestBody Map<String, String> shippingDetails) {
        return ResponseEntity.ok(orderService.createOrderFromCart(authentication.getName(), shippingDetails));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(Authentication authentication) {
        return ResponseEntity.ok(orderService.getUserOrders(authentication.getName()));
    }
}
