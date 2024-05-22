package com.DoDare.controller;

import com.DoDare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // for testing purposes only
    @PostMapping("/addPoints")
    public ResponseEntity<String> addItemToUser(
            @RequestParam("userId") Long userID,
            @RequestParam("points") Long points) {
        boolean success = userService.addPoints(userID, points);
        if (success) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.badRequest().build();
    }
}
