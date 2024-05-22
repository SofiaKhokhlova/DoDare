package com.DoDare.controller;

import com.DoDare.dto.CharacterDTO;
import com.DoDare.service.CharacterService;
import com.DoDare.service.InventoryService;
import com.DoDare.service.ItemService;
import com.DoDare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/character")
@RequiredArgsConstructor
public class CharacterController {

    private final UserService userService;
    private final ItemService itemService;
    private final InventoryService inventoryService;
    private final CharacterService characterService;

    @GetMapping("/getCharacter")
    public ResponseEntity<CharacterDTO> getUserItems(
            @RequestParam("userId") Long userId) {
        return characterService.getCharacter(userId)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PostMapping("/equipItem")
    public ResponseEntity<String> equipItem(
            @RequestParam("itemId") Long itemId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        if (characterService.equipItem(username, itemId)) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.badRequest().build();
    }
}
