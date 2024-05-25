package com.DoDare.mappers.group;

import com.DoDare.domain.group.UserGroup;
import com.DoDare.dto.group.UserGroupDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserGroupMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "group.id", target = "groupId")
    @Mapping(source = "user.name", target = "username")
    UserGroupDTO userGroupToUserGroupDTO(UserGroup userGroup);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "groupId", target = "group.id")
    @Mapping(source = "username", target = "user.name")
    UserGroup userGroupDTOToUserGroup(UserGroupDTO userGroupDTO);

    List<UserGroupDTO> userGroupsToUserGroupDTOs(List<UserGroup> userGroups);
}
