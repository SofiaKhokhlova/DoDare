package com.DoDare.mappers;

import com.DoDare.domain.User;
import com.DoDare.dto.SignUpDTO;
import com.DoDare.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDto(User user);
    User userDtoToUser(UserDTO user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "points", constant = "0L")
    User signUpToUser(SignUpDTO userDto);
}
