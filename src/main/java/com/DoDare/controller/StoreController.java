package com.DoDare.controller;

import com.DoDare.dto.ItemDTO;
import com.DoDare.enums.ItemType;
import com.DoDare.mappers.UserMapper;
import com.DoDare.repo.UserRepository;
import com.DoDare.service.ItemService;
import com.DoDare.service.StoreService;
import com.DoDare.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {

    private final UserService userService;
    private final ItemService itemService;
    private final StoreService storeService;

    @PostMapping("/buy/{itemId}")
    public ResponseEntity<ItemDTO> buyItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        return storeService.buyItem(username, itemId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/getItemsList")
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        return ResponseEntity.ok(storeService.getItems());
    }

    @GetMapping("/getItemsList/{itemTypeNumber}")
    public ResponseEntity<List<ItemDTO>> getAllItemsWithType(
            @PathVariable int itemTypeNumber) {
        ItemType itemType = ItemType.values()[itemTypeNumber];
        return ResponseEntity.ok(storeService.getItems(itemType));
    }

}
