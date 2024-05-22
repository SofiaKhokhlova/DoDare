package com.DoDare.controller;

import com.DoDare.dto.ItemDTO;
import com.DoDare.enums.ItemType;
import com.DoDare.service.InventoryService;
import com.DoDare.service.ItemService;
import com.DoDare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final UserService userService;
    private final ItemService itemService;
    private final InventoryService inventoryService;

    @GetMapping("/getUserItems")
    public ResponseEntity<List<ItemDTO>> getUserItems(
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return inventoryService.getUserItems(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/getUserItems/{itemTypeNumber}")
    public ResponseEntity<List<ItemDTO>> getAllItemsWithType(
            @PathVariable int itemTypeNumber,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        ItemType itemType = ItemType.values()[itemTypeNumber];
        return inventoryService.getUserItems(username, itemType)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    // used only for development
    @PostMapping("/addItemToUser/{userId}/{itemId}")
    public ResponseEntity<ItemDTO> addItemToUser(
            @PathVariable Long userId,
            @PathVariable Long itemId) {
        return inventoryService.addToUserInventory(userId, itemId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }



}
