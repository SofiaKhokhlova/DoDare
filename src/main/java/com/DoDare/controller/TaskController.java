package com.DoDare.controller;

import com.DoDare.dto.TaskDTO;
import com.DoDare.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO, @AuthenticationPrincipal UserDetails userDetails) {
        TaskDTO createdTask = taskService.createTask(taskDTO, userDetails.getUsername());
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getUserTasks(@AuthenticationPrincipal UserDetails userDetails) {
        List<TaskDTO> tasks = taskService.getAllUsersTasks(userDetails.getUsername());
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable Long taskId, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<TaskDTO> optionalTask = taskService.getTask(taskId, userDetails.getUsername());
        return optionalTask.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long taskId, @RequestBody TaskDTO taskDTO, @AuthenticationPrincipal UserDetails userDetails) {
        TaskDTO updatedTask = taskService.updateTask(taskId, taskDTO, userDetails.getUsername());
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId, @AuthenticationPrincipal UserDetails userDetails) {
        taskService.deleteTask(taskId, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}