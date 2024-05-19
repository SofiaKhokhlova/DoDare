package com.DoDare.service;

import com.DoDare.domain.Task;
import com.DoDare.domain.User;
import com.DoDare.dto.TaskDTO;
import com.DoDare.exceptions.AppException;
import com.DoDare.mappers.TaskMapper;
import com.DoDare.repo.TaskRepository;
import com.DoDare.repo.UserRepository;
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
    private final UserRepository userRepository;
    private final TaskMapper taskMapper;


    public TaskDTO createTask(TaskDTO taskDTO, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Task task = taskMapper.taskDTOToTask(taskDTO);
        task.setUser(optionalUser.get());
        Task savedTask = taskRepository.save(task);
        return taskMapper.taskToTaskDTO(savedTask);
    }

    public List<TaskDTO> getAllUsersTasks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        Optional<List<Task>> optionalTasks = taskRepository.findByUser_Id(user.getId());
        return optionalTasks
                .orElseGet(List::of)
                .stream()
                .map(taskMapper::taskToTaskDTO)
                .collect(Collectors.toList());
    }

    public Optional<TaskDTO> getTask(Long taskId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Optional<Task> optionalTask = taskRepository.findByIdAndUser(taskId, optionalUser.get());
        return optionalTask.map(taskMapper::taskToTaskDTO);
    }

    public TaskDTO updateTask(Long taskId, TaskDTO taskDTO, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User user = optionalUser.get();
        Optional<Task> optionalTask = taskRepository.findByIdAndUser(taskId, user);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            taskMapper.updateTaskFromDTO(taskDTO, task);
            Task savedTask = taskRepository.save(task);
            return taskMapper.taskToTaskDTO(savedTask);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found");
        }
    }

    public void deleteTask(Long taskId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User user = optionalUser.get();
        Optional<Task> optionalTask = taskRepository.findByIdAndUser(taskId, user);
        optionalTask.ifPresent(taskRepository::delete);
    }
}