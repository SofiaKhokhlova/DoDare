package com.DoDare.controller;

import com.DoDare.dto.UserDTO;
import com.DoDare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
}
