package com.DoDare.mappers;

import com.DoDare.domain.Item;
import com.DoDare.dto.ItemDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ItemMapper {

//    @Mapping(source = "imageUrl", ignore = true)
    Item itemDtoToItem(ItemDto itemDto);

    @Mapping(target = "imageUrl", constant = "")
    ItemDto itemToItemDto(Item item);


}
