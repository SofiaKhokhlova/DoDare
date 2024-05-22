package com.DoDare.mappers.group;

import com.DoDare.domain.group.UserTaskStatus;
import com.DoDare.dto.group.UserTaskStatusDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserTaskStatusMapper {

    @Mapping(target = "status", constant = "0")
    @Mapping(target = "user.id", source = "userId")
    @Mapping(target = "task.id", source = "taskId")
    UserTaskStatus userTaskStatusDTOToUserTaskStatus(UserTaskStatusDTO userTaskStatusDTO);

    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "taskId", source = "task.id")
    UserTaskStatusDTO userTaskStatusToUserTaskStatusDTO(UserTaskStatus userTaskStatus);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "task", ignore = true)
    void updateUserTaskStatusFromDTO(UserTaskStatusDTO userTaskStatusDTO, @MappingTarget UserTaskStatus userTaskStatus);
}