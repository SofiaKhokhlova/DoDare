package com.DoDare.controller;

import com.DoDare.dto.UserDTO;
import com.DoDare.enums.UserRole;
import com.DoDare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getUser(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return ResponseEntity.ok(userService.findByEmail(username));
    }

    // for testing purposes only
    @PostMapping("/addPoints")
    public ResponseEntity<String> addItemToUser(
            @RequestParam("userId") Long userId,
            @RequestParam("points") Long points) {
        boolean success = userService.addPoints(userId, points);
        if (success) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/changeUserRole")
    public ResponseEntity<UserDTO> changeUserRole(
            @RequestParam("userId") Long targetUserId,
            @RequestParam("newRole") Long newRoleNumber,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        if (!userService.isUserManager(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (newRoleNumber >= UserRole.values().length) {
            return ResponseEntity.badRequest().build();
        }
        UserRole newUserRole = UserRole.values()[newRoleNumber.intValue()];

        Optional<UserDTO> newUserData = userService.changeUserRole(targetUserId, newUserRole);
        return newUserData
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
