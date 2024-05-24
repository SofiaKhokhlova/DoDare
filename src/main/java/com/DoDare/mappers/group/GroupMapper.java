package com.DoDare.mappers.group;

import com.DoDare.domain.group.Group;
import com.DoDare.dto.group.GroupDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface GroupMapper {

    Group groupDTOToGroup(GroupDTO groupDTO);

    GroupDTO groupToGroupDTO(Group group);

    void updateGroupFromDTO(GroupDTO groupDTO, @MappingTarget Group group);
}