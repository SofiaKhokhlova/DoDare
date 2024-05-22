package com.DoDare.service;

import com.DoDare.domain.Item;
import com.DoDare.domain.User;
import com.DoDare.dto.ItemDTO;
import com.DoDare.dto.UserDTO;
import com.DoDare.enums.ItemType;
import com.DoDare.mappers.ItemMapper;
import com.DoDare.mappers.UserMapper;
import com.DoDare.repo.ItemRepository;
import com.DoDare.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class StoreService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ItemMapper itemMapper;
    private final UserMapper userMapper;
    private final InventoryService inventoryService;
    private final UserService userService;

    public Optional<ItemDTO> buyItem(String userEmail, Long itemId) {
        Optional<User> userOptional = userRepository
                .findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (itemOptional.isEmpty()) {
            return Optional.empty();
        }

        User user = userOptional.get();
        Item item = itemOptional.get();

        Optional<ItemDTO> addedItem = Optional.empty();
        if (userService.takePoints(user.getId(), (long)item.getPrice())) {
            addedItem = inventoryService.addToUserInventory(user.getId(), itemId);
            if (addedItem.isEmpty()) {
                userService.addPoints(user.getId(), (long)item.getPrice());
            }
        }
        return addedItem;
    }

    public List<ItemDTO> getItems() {
        return itemRepository
                .findAll()
                .stream()
                .map(itemMapper::itemToItemDto)
                .collect(Collectors.toList());
    }

    public List<ItemDTO> getItems(ItemType itemType) {
        return getItems()
                .stream()
                .filter((ItemDTO itemDTO) -> (itemDTO.getType() == itemType))
                .collect(Collectors.toList());
    }
}
