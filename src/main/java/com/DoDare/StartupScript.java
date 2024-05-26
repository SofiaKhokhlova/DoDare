package com.DoDare;
import com.DoDare.dto.ItemDTO;
import com.DoDare.enums.ItemType;
import com.DoDare.service.CharacterService;
import com.DoDare.service.ItemService;
import com.DoDare.service.PropertyService;
import com.DoDare.service.StoreService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Comparator;
import java.util.Optional;
import java.util.List;
import java.util.function.Function;

@Component
public class StartupScript {

    @Autowired
    private ItemService itemService;

    @Autowired
    private StoreService storeService;

    @Autowired
    private CharacterService characterService;

    private void checkAddDefaultItems() {

        List<ItemDTO> headsList = storeService.getItems(ItemType.HEAD);
        List<ItemDTO> bodiesList = storeService.getItems(ItemType.BODY);
        List<ItemDTO> legsList = storeService.getItems(ItemType.LEGS);

        // TODO: add function to item service for getting default parameters based on item type
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setPrice(0);
        itemDTO.setName("default item");
        itemDTO.setDescription("default item");

        if (headsList.isEmpty()) {
            itemDTO.setType(ItemType.HEAD);
            itemDTO.setFileName(PropertyService.getDefaultHeadFilename());
            itemService.createItemFromExistingFile(itemDTO);
        }
        if (bodiesList.isEmpty()) {
            itemDTO.setType(ItemType.BODY);
            itemDTO.setFileName(PropertyService.getDefaultBodyFilename());
            itemService.createItemFromExistingFile(itemDTO);
        }
        if (legsList.isEmpty()) {
            itemDTO.setType(ItemType.LEGS);
            itemDTO.setFileName(PropertyService.getDefaultLegsFilename());
            itemService.createItemFromExistingFile(itemDTO);
        }
    }

    // finds items of each type with the smallest id and saves this id as an id of default item of corresponding type
    // should be called only after ensuring that there is at least one item of each type
    private void setDefaultItemsIds() {
        Function<ItemType, Long> findTypeDefaultItemId = (type) -> {
            List<ItemDTO> itemsList = storeService.getItems(type);
            itemsList.sort(Comparator.comparing(ItemDTO::getId));
            return itemsList.getFirst().getId();
        };

        CharacterService.setDefaultHeadId(findTypeDefaultItemId.apply(ItemType.HEAD));
        CharacterService.setDefaultBodyId(findTypeDefaultItemId.apply(ItemType.BODY));
        CharacterService.setDefaultLegsId(findTypeDefaultItemId.apply(ItemType.LEGS));
    }

    @PostConstruct
    public void init() {
        checkAddDefaultItems();
        setDefaultItemsIds();
    }
}
