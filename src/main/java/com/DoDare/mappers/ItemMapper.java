package com.DoDare.mappers;

import com.DoDare.domain.Item;
import com.DoDare.dto.ItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ItemMapper {

//    @Mapping(source = "imageUrl", ignore = true)
    Item itemDtoToItem(ItemDto itemDto);

    @Mapping(target = "imageUrl", source = "fileName", qualifiedByName=  "fileNameToImageUrl")
    ItemDto itemToItemDto(Item item);

    @Named("fileNameToImageUrl")
    static String fileNameToImageUrl(String fileName) {
        String baseUrl = "http://localhost:8080/images";
        return baseUrl + "/" + fileName;
    }

}
