package com.DoDare.controller;

import com.DoDare.dto.ItemDTO;
import com.DoDare.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/create")
    public ResponseEntity<ItemDTO> createItem(
            @RequestPart("image") MultipartFile image,
            @RequestPart("data") ItemDTO itemDto) {
        Optional<ItemDTO> createdTaskOptional = itemService.createItem(image, itemDto);
        return createdTaskOptional
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/get/{itemId}")
    public ResponseEntity<ItemDTO> getItem(@PathVariable Long itemId) {
        Optional<ItemDTO> itemDtoOptional = itemService.getItem(itemId);

        // TODO: we should not send fileName here
        return itemDtoOptional
                .map(ResponseEntity::ok)
                // TODO: not sure if it's a correct error code
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/updateImage/{itemId}")
    public ResponseEntity<ItemDTO> updateItemImage(
            @PathVariable Long itemId,
            @RequestPart("image") MultipartFile image) {
        Optional<ItemDTO> itemDtoOptional = itemService.updateItemImage(itemId, image);
        return itemDtoOptional
                .map(ResponseEntity::ok)
                // TODO: not sure if it's a correct error code
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("/updateInfo/{itemId}")
    public ResponseEntity<ItemDTO> updateItemInfo(
            @PathVariable Long itemId,
            @RequestBody ItemDTO itemDto) {
        Optional<ItemDTO> itemDtoOptional = itemService.updateItemInfo(itemId, itemDto);
        return itemDtoOptional
                .map(ResponseEntity::ok)
                // TODO: not sure if it's a correct error code
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
        return ResponseEntity.ok().build();
    }
}
