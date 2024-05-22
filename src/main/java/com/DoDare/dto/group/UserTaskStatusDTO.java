package com.DoDare.dto.group;

import lombok.Data;

@Data
public class UserTaskStatusDTO {
    private Long id;
    private Long userId;
    private Long taskId;
    private int status;
}