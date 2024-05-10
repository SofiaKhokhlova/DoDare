package com.DoDare.service;

import com.DoDare.domain.Task;
import com.DoDare.dto.TaskDTO;
import com.DoDare.mappers.TaskMapper;
import com.DoDare.repo.TaskRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;


    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = taskMapper.taskDTOToTask(taskDTO);
        Task savedTask = taskRepository.save(task);
        return taskMapper.taskToTaskDTO(savedTask);
    }

    public List<TaskDTO> getAllUsersTasks(Long userId) {
        Optional<List<Task>> optionalTasks = taskRepository.findByUser_Id(userId);
        return optionalTasks
                .orElseGet(List::of)
                .stream()
                .map(taskMapper::taskToTaskDTO)
                .collect(Collectors.toList());
    }

    public Optional<TaskDTO> getTask(Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        return optionalTask.map(taskMapper::taskToTaskDTO);
    }

    public TaskDTO updateTask(Long taskId, TaskDTO taskDTO) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task = taskMapper.taskDTOToTask(taskDTO);
            task.setId(taskId);
            Task savedTask = taskRepository.save(task);
            return taskMapper.taskToTaskDTO(savedTask);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found");
        }
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}