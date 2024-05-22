package com.DoDare.service.group;

import com.DoDare.domain.group.Group;
import com.DoDare.domain.User;
import com.DoDare.domain.group.UserGroup;
import com.DoDare.domain.group.UserTaskStatus;
import com.DoDare.dto.TaskDTO;
import com.DoDare.dto.group.UserTaskStatusDTO;
import com.DoDare.mappers.group.UserTaskStatusMapper;
import com.DoDare.repo.TaskRepository;
import com.DoDare.mappers.TaskMapper;
import com.DoDare.repo.UserRepository;
import com.DoDare.repo.group.GroupRepository;
import com.DoDare.repo.group.UserGroupRepository;
import com.DoDare.repo.group.UserTaskStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import com.DoDare.domain.Task;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupTaskService {

    private final TaskRepository taskRepository;
    private final GroupRepository groupRepository;
    private final UserGroupRepository userGroupRepository;
    private final UserTaskStatusRepository userTaskStatusRepository;
    private final TaskMapper taskMapper;
    private final UserTaskStatusMapper userTaskStatusMapper;
    private final UserRepository userRepository;

    public TaskDTO addTaskToGroup(Long groupId, TaskDTO taskDTO, String email) {
        User user = userRepository.findByEmail(email).get();
        Group group = groupRepository.findByAdminUserAndId(user, groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));

        Task task = taskMapper.taskDTOToTask(taskDTO);
        task.setGroup(group);
        Task savedTask = taskRepository.save(task);

        List<UserGroup> allGroupUsers = userGroupRepository.findAllByGroupId(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group users not found"));

        for (UserGroup userGroup : allGroupUsers) {
            UserTaskStatusDTO userTaskStatusDTO = new UserTaskStatusDTO();
            userTaskStatusDTO.setTaskId(savedTask.getId());
            userTaskStatusDTO.setUserId(userGroup.getId());
            UserTaskStatus userTaskStatus = userTaskStatusMapper.userTaskStatusDTOToUserTaskStatus(userTaskStatusDTO);

            userTaskStatusRepository.save(userTaskStatus);
        }

        return taskMapper.taskToTaskDTO(savedTask);
    }

    public TaskDTO updateTaskInGroup(Long groupId, Long taskId, TaskDTO taskDTO, String email) {
        User user = userRepository.findByEmail(email).get();
        Group group = groupRepository.findByAdminUserAndId(user, groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        Task task = taskRepository.findByIdAndGroup(taskId, group)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found"));
        taskMapper.updateTaskFromDTO(taskDTO, task);
        return taskMapper.taskToTaskDTO(taskRepository.save(task));
    }

    public void deleteTaskFromGroup(Long groupId, Long taskId, String email) {
        User user = userRepository.findByEmail(email).get();
        Group group = groupRepository.findByAdminUserAndId(user, groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        Task task = taskRepository.findByIdAndGroup(taskId, group)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found"));

        List<UserTaskStatus> allUserTasks = userTaskStatusRepository.findAllByTask(task)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group users tasks not found"));

        userTaskStatusRepository.deleteAll(allUserTasks);

        taskRepository.delete(task);
    }

    public List<TaskDTO> getTasksForGroup(Long groupId, String email) {
        User user = userRepository.findByEmail(email).get();
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(user.getId(), groupId);
        Group group = groupRepository.findByUserGroupsContains(Collections.singletonList(optionalUserGroup.orElse(null)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));

        List<Task> tasks = taskRepository.findByGroup(group);
        return tasks.stream()
                .map(taskMapper::taskToTaskDTO)
                .collect(Collectors.toList());
    }

    public UserTaskStatusDTO markTaskAsCompletedForUser(Long taskId, String email) {
        User user = userRepository.findByEmail(email).get();
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found"));
        UserTaskStatus userTaskStatus = userTaskStatusRepository.findByUserAndTask(user, task)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User task not found"));

        if(userTaskStatus.getStatus() == 1) return userTaskStatusMapper.userTaskStatusToUserTaskStatusDTO(userTaskStatus);

        userTaskStatus.setStatus(1);
        UserTaskStatus savedUserTaskStatus = userTaskStatusRepository.save(userTaskStatus);

        UserGroup userGroup = userGroupRepository.findByUserIdAndGroupId(user.getId(), task.getGroup().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User group not found"));
        userGroup.setPoints(userGroup.getPoints() + task.getReward());
        userGroupRepository.save(userGroup);

        return userTaskStatusMapper.userTaskStatusToUserTaskStatusDTO(savedUserTaskStatus);
    }

    public UserTaskStatusDTO getUserTaskStatus(Long taskId, String email) {
        User user = userRepository.findByEmail(email).get();
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task not found"));
        UserTaskStatus userTaskStatus = userTaskStatusRepository.findByUserAndTask(user, task)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User task status not found"));

        return userTaskStatusMapper.userTaskStatusToUserTaskStatusDTO(userTaskStatus);
    }
}
