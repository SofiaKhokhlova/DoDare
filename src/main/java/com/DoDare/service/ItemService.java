package com.DoDare.service;

import com.DoDare.domain.Item;
import com.DoDare.mappers.ItemMapper;
import com.DoDare.repo.ItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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


// D.Yarkin:
// Generally, I completely don't like the implementation of ItemService and ItemDto. The problem is that we should store
// image url and image file path in ItemDto in sake of convenience, but at the same time it doesn't make any sense to
// send a user a file path. Also, it's pointless to store an image url in the database, so currently it's set via
// ItemMapper, which seems to be a pretty shitty solution.
@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ItemMapper itemMapper;

    private boolean deleteImageFile(String imageFileName) {
        String imageFilePath = PropertyService.getItemsImagesDir() + File.separator + imageFileName;
        Path filePath = Paths.get(imageFilePath);
        try {
            Files.delete(filePath);
        }
        catch (IOException e) {
            return false;
        }
        return true;
    }

    // D.Yarkin:
    // the whole workaround with extractFileName is made for the case if we decide to rename images when
    // they are uploaded. I really wish to get rid of it asap if we will never have such case
    private String extractFileName(String imageFilePath) {
        // TODO: It stinks
        String pattern = Pattern.quote(System.getProperty("file.separator"));
        String[] parts = imageFilePath.split(pattern);
        return parts[parts.length - 1];
    }

    // returns image file path
    private Optional<String> saveItemImage(MultipartFile image) {
        File directory = new File(PropertyService.getItemsImagesDir());
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fullFilePath = "";
        try {
            fullFilePath = PropertyService.getItemsImagesDir() + File.separator + image.getOriginalFilename();
            File uploadFile = new File(fullFilePath);
            image.transferTo(uploadFile);
        } catch (IOException e) {
            e.printStackTrace();
            return Optional.empty();
        }

        return Optional.of(fullFilePath);
    }

    public Optional<ItemDto> createItem(MultipartFile image, ItemDto itemDto) {
        Optional<String> savedImagePathOptional = saveItemImage(image);
        return savedImagePathOptional.flatMap((String filePath) -> {
            itemDto.setFileName(extractFileName(filePath));
            Item item = itemMapper.itemDtoToItem(itemDto);
            Item savedItem = itemRepository.save(item);
            return Optional.of(savedItem);
        }).flatMap((Item item) -> Optional.of(itemMapper.itemToItemDto(item)));
    }

    public void deleteItem(Long itemId) {
        // TODO: also delete corresponding file
        // TODO: check if deletion was successful
        itemRepository.deleteById(itemId);
    }

    public Optional<ItemDto> getItem(Long id) {
        return itemRepository
                .findById(id)
                .flatMap((Item item) -> Optional.of(itemMapper.itemToItemDto(item)));
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
        deleteImageFile(itemDto.getFileName());

        Optional<String> filePathOptional = saveItemImage(image);
        if (filePathOptional.isEmpty()) {
            return Optional.empty();
        }

        // TODO: I don't like that we have the same logic in createItem and updateItem
        String filePath = filePathOptional.get();
        itemDto.setFileName(extractFileName(filePath));

        Item item = itemMapper.itemDtoToItem(itemDto);
        Item savedItem = itemRepository.save(item);

        ItemDto savedItemDto = itemMapper.itemToItemDto(savedItem);

        return Optional.of(savedItemDto);
    }

    public Optional<ItemDto> updateItemInfo(Long itemId, ItemDto newItemDto) {
        Optional<ItemDto> oldItemDtoOptional = itemRepository
                .findById(itemId)
                .map(itemMapper::itemToItemDto);
        if (oldItemDtoOptional.isEmpty()) {
            return Optional.empty();
        }
        newItemDto.setFileName(oldItemDtoOptional.get().getFileName());
        newItemDto.setId(itemId);

        Item newItem = itemMapper.itemDtoToItem(newItemDto);
        Item savedItem = itemRepository.save(newItem);

        ItemDto savedItemDto = itemMapper.itemToItemDto(savedItem);
        return Optional.of(savedItemDto);
    }
}
