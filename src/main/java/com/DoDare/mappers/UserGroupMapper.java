package com.DoDare.mappers;

import com.DoDare.domain.UserGroup;
import com.DoDare.dto.UserGroupDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserGroupMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "group.id", target = "groupId")
    UserGroupDTO userGroupToUserGroupDTO(UserGroup userGroup);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "groupId", target = "group.id")
    UserGroup userGroupDTOToUserGroup(UserGroupDTO userGroupDTO);
}
