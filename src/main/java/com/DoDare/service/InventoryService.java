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

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class InventoryService {

     private final ItemRepository itemRepository;
     private final UserRepository userRepository;
     private final ItemMapper itemMapper;
     private final UserMapper userMapper;

     public Optional<List<ItemDTO>> getUserItems(String userEmail) {
        Optional<User> userOptional = userRepository
                .findByEmail(userEmail);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }

        Set<Item> itemsSet = userOptional.get().getAvailableItems();
        return Optional.of(itemsSet
                .stream()
                .map(itemMapper::itemToItemDto)
                .collect(Collectors.toList()));

    }

    public Optional<List<ItemDTO>> getUserItems(String userEmail, ItemType itemType) {
        Optional<List<ItemDTO>> allItemsListOptional = getUserItems(userEmail);
        return allItemsListOptional.map(itemDTOs -> itemDTOs
                .stream()
                .filter((ItemDTO itemDTO) -> (itemDTO.getType() == itemType))
                .collect(Collectors.toList()));
    }

    public Optional<ItemDTO> addToUserInventory(Long userId, Long itemId) {
        Optional<User> userOptional = userRepository
                .findById(userId);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }
        User user = userOptional.get();

        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (itemOptional.isEmpty()) {
            return Optional.empty();
        }
        Item item = itemOptional.get();

        user.getAvailableItems().add(item);

        return Optional.of(itemMapper.itemToItemDto(item));
    }

    public void addDefaultItems(Long userId) {
        addToUserInventory(userId, CharacterService.defaultHeadId);
        addToUserInventory(userId, CharacterService.defaultBodyId);
        addToUserInventory(userId, CharacterService.defaultLegsId);
    }

    public boolean doesPossessItem(Long userId, Long itemId) {
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        Optional<User> userOptional = userRepository.findById(userId);
        if (itemOptional.isEmpty() || userOptional.isEmpty()) {
            return false;
        }
        Item item = itemOptional.get();
        User user = userOptional.get();

        return user.getAvailableItems().contains(item);
    }
}
