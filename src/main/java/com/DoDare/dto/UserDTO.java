package com.DoDare.dto;

import com.DoDare.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String token;
    private Long points;
    private UserRole role;
}
