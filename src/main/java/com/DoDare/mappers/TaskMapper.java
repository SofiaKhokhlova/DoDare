package com.DoDare.mappers;

import com.DoDare.domain.Task;
import com.DoDare.dto.TaskDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "status", constant = "0")
    Task taskDTOToTask(TaskDTO taskDTO);

    TaskDTO taskToTaskDTO(Task task);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateTaskFromDTO(TaskDTO taskDTO, @MappingTarget Task task);
}