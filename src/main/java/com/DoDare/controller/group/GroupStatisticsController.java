package com.DoDare.controller.group;

import com.DoDare.domain.Statistics;
import com.DoDare.domain.group.GroupStatistics;
import com.DoDare.dto.group.GroupStatisticsDTO;
import com.DoDare.service.StatisticsService;
import com.DoDare.service.group.GroupStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/group-statistics")
public class GroupStatisticsController {
    private final GroupStatisticsService groupStatisticsService;

    @GetMapping("/{groupId}")
    public GroupStatisticsDTO getGroupStatistics(@PathVariable Long groupId, @AuthenticationPrincipal UserDetails userDetails) {
        return groupStatisticsService.getGroupStatistics(groupId, userDetails.getUsername());
    }

}