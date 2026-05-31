package com.wrapbrand.controller;

import com.wrapbrand.entity.Cart;
import com.wrapbrand.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCartForUser(authentication.getName()));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addItem(
            Authentication authentication,
            @RequestBody Map<String, Object> payload) {
        Long productId = Long.valueOf(payload.get("productId").toString());
        Integer quantity = Integer.valueOf(payload.getOrDefault("quantity", 1).toString());
        return ResponseEntity.ok(cartService.addItemToCart(authentication.getName(), productId, quantity));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<Cart> updateItem(
            Authentication authentication,
            @PathVariable Long itemId,
            @RequestBody Map<String, Integer> payload) {
        return ResponseEntity.ok(cartService.updateItemQuantity(authentication.getName(), itemId, payload.get("quantity")));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Cart> removeItem(
            Authentication authentication,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(authentication.getName(), itemId));
    }
}
