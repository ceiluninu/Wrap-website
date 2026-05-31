package com.wrapbrand.service;

import com.wrapbrand.entity.*;
import com.wrapbrand.exception.BadRequestException;
import com.wrapbrand.repository.OrderRepository;
import com.wrapbrand.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, CartService cartService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.cartService = cartService;
    }

    @Transactional
    public Order createOrderFromCart(String email, Map<String, String> shippingDetails) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Cart cart = cartService.getCartForUser(email);

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot place order with an empty cart");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setShippingAddress(formatAddress(shippingDetails));

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductId(cartItem.getProduct().getId());
            orderItem.setProductName(cartItem.getProduct().getName());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getProduct().getPrice());

            order.getItems().add(orderItem);

            BigDecimal itemTotal = cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            total = total.add(itemTotal);
        }

        // Add 8% tax (demo)
        total = total.multiply(BigDecimal.valueOf(1.08));
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);
        
        // Clear cart after order placement
        cartService.clearCart(user);

        return savedOrder;
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
    
    private String formatAddress(Map<String, String> details) {
        return String.format("%s %s\n%s, %s", 
            details.getOrDefault("firstName", ""),
            details.getOrDefault("lastName", ""),
            details.getOrDefault("address", ""),
            details.getOrDefault("city", "")
        ).trim();
    }
}
