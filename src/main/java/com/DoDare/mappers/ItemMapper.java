package com.DoDare.mappers;

import com.DoDare.domain.Item;
import com.DoDare.dto.ItemDto;
import com.DoDare.service.PropertyService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ItemMapper {

    Item itemDtoToItem(ItemDto itemDto);

    @Mapping(target = "imageUrl", source = "fileName", qualifiedByName = "fileNameToImageUrl")
    ItemDto itemToItemDto(Item item);

    @Named("fileNameToImageUrl")
    static String fileNameToImageUrl(String fileName) {
        return PropertyService.getBaseImagesUrl() + "/" + fileName;
    }

}
