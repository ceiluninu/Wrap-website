package com.wrapbrand.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsDTO {
    private long totalUsers;
    private long totalOrders;
    private double totalRevenue;
    private long totalProducts;
}
