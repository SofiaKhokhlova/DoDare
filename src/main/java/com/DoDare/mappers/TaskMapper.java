package com.DoDare.mappers;

import com.DoDare.domain.Task;
import com.DoDare.dto.TaskDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(source = "userId", target = "user.id")
    @Mapping(target = "status", constant = "0")
    Task taskDTOToTask(TaskDTO taskDTO);

    @Mapping(source = "user.id", target = "userId")
    TaskDTO taskToTaskDTO(Task task);
}