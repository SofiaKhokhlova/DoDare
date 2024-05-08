package com.DoDare.mappers;

import com.DoDare.domain.User;
import com.DoDare.dto.SignUpDto;
import com.DoDare.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "points", constant = "0L")
    User signUpToUser(SignUpDto userDto);
}
