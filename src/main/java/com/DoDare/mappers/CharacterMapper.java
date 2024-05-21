package com.DoDare.mappers;

import com.DoDare.dto.CharacterDTO;
import com.DoDare.domain.Character;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CharacterMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "hatId", target = "hat.id")
    @Mapping(source = "bodyId", target = "body.id")
    @Mapping(source = "legsId", target = "legs.id")
    Character characterDtoToCharacter(CharacterDTO characterDto);

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "hat.id", target = "hatId")
    @Mapping(source = "body.id", target = "bodyId")
    @Mapping(source = "legs.id", target = "legsId")
    CharacterDTO characterToCharacterDto(Character character);
}
