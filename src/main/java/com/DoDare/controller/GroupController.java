package com.DoDare.controller;

import com.DoDare.domain.Group;
import com.DoDare.domain.UserGroup;
import com.DoDare.dto.GroupDTO;
import com.DoDare.dto.UserGroupDTO;
import com.DoDare.service.GroupService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public ResponseEntity<GroupDTO> createGroup(@RequestBody GroupDTO groupDTO) {
        GroupDTO createdGroup = groupService.createGroup(groupDTO);
        return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<GroupDTO>> getAllGroupsForUser(@PathVariable Long userId) {
        List<GroupDTO> groups = groupService.getAllGroupsForUser(userId);
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @GetMapping("/usergroup/{userId}/{groupId}")
    public ResponseEntity<UserGroupDTO> getUserGroup(@PathVariable Long userId, @PathVariable Long groupId) {
        Optional<UserGroupDTO> optionalUserGroupDTO = groupService.getUserGroup(userId, groupId);
        return optionalUserGroupDTO.map(userGroupDTO -> new ResponseEntity<>(userGroupDTO, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> getGroup(@PathVariable Long groupId) {
        Optional<GroupDTO> optionalGroupDTO = groupService.getGroup(groupId);
        return optionalGroupDTO.map(groupDTO -> new ResponseEntity<>(groupDTO, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long groupId, @RequestBody GroupDTO groupDTO) {
        GroupDTO updatedGroup = groupService.updateGroup(groupId, groupDTO);
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId) {
        groupService.deleteGroup(groupId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
