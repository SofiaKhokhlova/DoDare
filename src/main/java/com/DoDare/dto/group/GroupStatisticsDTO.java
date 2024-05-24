package com.DoDare.dto.group;

import java.time.LocalDate;

public class GroupStatisticsDTO {
    private Long id;
    private Long groupId;
    private int totalTasks;
    private int completedTasks;
    private LocalDate createdDate;
}