package com.DoDare.mappers;

import com.DoDare.domain.Item;
import com.DoDare.dto.ItemDTO;
import com.DoDare.service.PropertyService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ItemMapper {

    Item itemDtoToItem(ItemDTO itemDto);

    @Mapping(target = "imageUrl", source = "fileName", qualifiedByName = "fileNameToImageUrl")
    ItemDTO itemToItemDto(Item item);

    @Named("fileNameToImageUrl")
    static String fileNameToImageUrl(String fileName) {
        return PropertyService.getBaseImagesUrl() + "/" + fileName;
    }

}
