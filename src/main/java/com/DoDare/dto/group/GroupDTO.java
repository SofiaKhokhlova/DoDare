package com.DoDare.dto.group;

import lombok.Data;

@Data
public class GroupDTO {
    private Long id;
    private String name;
    private Long adminUserId;
    private int usersCount;
}