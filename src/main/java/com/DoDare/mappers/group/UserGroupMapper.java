package com.DoDare.mappers.group;

import com.DoDare.domain.group.UserGroup;
import com.DoDare.dto.group.UserGroupDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserGroupMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "group.id", target = "groupId")
    UserGroupDTO userGroupToUserGroupDTO(UserGroup userGroup);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "groupId", target = "group.id")
    UserGroup userGroupDTOToUserGroup(UserGroupDTO userGroupDTO);
}
