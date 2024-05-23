package com.DoDare.controller;

import com.DoDare.domain.Statistics;
import com.DoDare.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final StatisticsService statisticsService;

    @GetMapping
    public Statistics getUserStatistics(@AuthenticationPrincipal UserDetails userDetails) {
        return statisticsService.getUserStatistics(userDetails.getUsername());
    }

}