package com.DoDare.controller.group;

import com.DoDare.dto.TaskDTO;
import com.DoDare.dto.group.UserTaskStatusDTO;
import com.DoDare.service.group.GroupTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/group-tasks")
@RequiredArgsConstructor
public class GroupTaskController {

    private final GroupTaskService groupTaskService;

    @PostMapping("/{groupId}")
    public TaskDTO addTaskToGroup(@PathVariable Long groupId, @RequestBody TaskDTO taskDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return groupTaskService.addTaskToGroup(groupId, taskDTO, userDetails.getUsername());
    }

    @PutMapping("/{groupId}/{taskId}")
    public TaskDTO updateTaskInGroup(@PathVariable Long groupId, @PathVariable Long taskId, @RequestBody TaskDTO taskDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return groupTaskService.updateTaskInGroup(groupId, taskId, taskDTO, userDetails.getUsername());
    }

    @DeleteMapping("/{groupId}/{taskId}")
    public ResponseEntity<Void> deleteTaskFromGroup(@PathVariable Long groupId, @PathVariable Long taskId, @AuthenticationPrincipal UserDetails userDetails) {
        groupTaskService.deleteTaskFromGroup(groupId, taskId, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{groupId}")
    public List<TaskDTO> getTasksForGroup(@PathVariable Long groupId, @AuthenticationPrincipal UserDetails userDetails) {
        return groupTaskService.getTasksForGroup(groupId, userDetails.getUsername());
    }

    @PutMapping("/{taskId}/status")
    public UserTaskStatusDTO markTaskAsCompletedForUser(@PathVariable Long taskId, @AuthenticationPrincipal UserDetails userDetails) {
        return groupTaskService.markTaskAsCompletedForUser(taskId, userDetails.getUsername());
    }

    @GetMapping("/{taskId}/status")
    public UserTaskStatusDTO getUserTaskStatus(@PathVariable Long taskId, @AuthenticationPrincipal UserDetails userDetails) {
        return groupTaskService.getUserTaskStatus(taskId, userDetails.getUsername());
    }
}
