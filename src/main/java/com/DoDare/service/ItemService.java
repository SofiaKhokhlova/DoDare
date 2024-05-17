package com.DoDare.service;

import com.DoDare.domain.Item;
import com.DoDare.enums.ItemType;
import com.DoDare.mappers.ItemMapper;
import com.DoDare.repo.ItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.DoDare.dto.ItemDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    private boolean deleteImageFile(String imageFilePath) {
        Path filePath = Paths.get(imageFilePath);
        try {
            Files.delete(filePath);
        }
        catch (IOException e) {
            return false;
        }
        return true;
    }

    private String extractOriginalFileName(String imageFilePath) {
        // TODO: It stinks
        String pattern = Pattern.quote(System.getProperty("file.separator"));
        String[] parts = imageFilePath.split(pattern);
        return parts[parts.length - 1];
    }

    private Optional<String> saveItemImage(MultipartFile image, ItemType type) {
        // TODO: this is shit, needs to be rewritten
        String baseUploadDir = "E:\\University\\DoDare\\src\\main\\resources\\static\\images";
        String itemTypePath = "";
        if (type == ItemType.HEAD) {
            itemTypePath = "hat";
        }
        else if (type == ItemType.BODY) {
            itemTypePath = "body";
        }
        else {
            itemTypePath = "legs";
        }
        File directory = new File(baseUploadDir + File.separator + itemTypePath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fullFilePath = "";
        try {
            fullFilePath = baseUploadDir + File.separator +  itemTypePath + File.separator + image.getOriginalFilename();
            File uploadFile = new File(fullFilePath);
            image.transferTo(uploadFile);
        } catch (IOException e) {
            e.printStackTrace();
            return Optional.empty();
        }

        return Optional.of(fullFilePath);
    }

    private String buildImageLink(ItemDto itemDto) {
        // TODO: needs to be imported as environmental variable or from application.properties
        String url = "http://localhost:8080/images";

        // TODO: needs to be rewritten
        if (itemDto.getType() == ItemType.HEAD) {
            url += "/hat";
        }
        else if (itemDto.getType() == ItemType.BODY) {
            url += "/body";
        }
        else {
            url += "/legs";
        }

        // TODO: I don't like how it looks like
        url += "/" + extractOriginalFileName(itemDto.getFilePath());

        return url;
    }

    public Optional<ItemDto> createItem(MultipartFile image, ItemDto itemDto) {
        Optional<String> savedImagePathOptional = saveItemImage(image, itemDto.getType());

        Optional<ItemDto> savedItemDtoOptional = savedImagePathOptional.flatMap((String filePath) -> {
            itemDto.setFilePath(filePath);
            Item item = itemMapper.itemDtoToItem(itemDto);
            Item savedItem = itemRepository.save(item);
            return Optional.of(savedItem);
        }).flatMap((Item item) -> {
            return Optional.of(itemMapper.itemToItemDto(item));
        });

        return savedItemDtoOptional;
    }

    public void deleteItem(Long itemId) {
        // TODO: also delete corresponding file
        // TODO: check if deletion was successful
        itemRepository.deleteById(itemId);
    }

    public Optional<ItemDto> getItem(Long id) {
        // TODO: can be simplified
        Optional<ItemDto> itemDtoOptional = itemRepository
                .findById(id)
                .flatMap((Item item) -> Optional.of(itemMapper.itemToItemDto(item)))
                .flatMap((ItemDto itemDto) -> {
                    itemDto.setImageUrl(buildImageLink(itemDto));
                    return Optional.of(itemDto);
                });
        return itemDtoOptional;
    }

    // TODO:
    //  here the problem may appear: if two items use the same image
    //  then updating one of them will lead to incorrect file path
    //  in another one. The same issue appears in deleteItem()
    public Optional<ItemDto> updateItemImage(Long taskId, MultipartFile image) {
        Optional<ItemDto> itemDtoOptional = itemRepository
                .findById(taskId)
                .flatMap((Item item) -> Optional.of(itemMapper.itemToItemDto(item)));
        if (itemDtoOptional.isEmpty()) {
            return Optional.empty();
        }

        ItemDto itemDto = itemDtoOptional.get();
        deleteImageFile(itemDto.getFilePath());
        Optional<String> filePathOptional = saveItemImage(image, itemDto.getType());
        if (filePathOptional.isEmpty()) {
            return Optional.empty();
        }
        String filePath = filePathOptional.get();
        itemDto.setFilePath(filePath);

        Item item = itemMapper.itemDtoToItem(itemDto);
        Item savedItem = itemRepository.save(item);

        // TODO: I really want to rewrite it to store the url in the DB alongside the file path
        ItemDto savedItemDto = itemMapper.itemToItemDto(savedItem);
        savedItemDto.setImageUrl(buildImageLink(savedItemDto));

        return Optional.of(savedItemDto);
    }

    // TODO: if item's type was changed we need to transfer corresponding
    //  image to another folder. Probably we shouldn't store images
    //  in separate folders at all?
    public Optional<ItemDto> updateItemInfo(Long itemId, ItemDto newItemDto) {
        Optional<ItemDto> oldItemDtoOptional = itemRepository
                .findById(itemId)
                .map(itemMapper::itemToItemDto);
        if (oldItemDtoOptional.isEmpty()) {
            return Optional.empty();
        }
        newItemDto.setFilePath(oldItemDtoOptional.get().getFilePath());
        newItemDto.setId(itemId);

        Item newItem = itemMapper.itemDtoToItem(newItemDto);
        Item savedItem = itemRepository.save(newItem);

        // TODO: I really want to rewrite it to store the url in the DB alongside the file path
        ItemDto savedItemDto = itemMapper.itemToItemDto(savedItem);
        savedItemDto.setImageUrl(buildImageLink(savedItemDto));
        return Optional.of(savedItemDto);
    }
}
