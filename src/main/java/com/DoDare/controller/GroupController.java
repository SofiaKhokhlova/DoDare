package com.DoDare.controller;

import com.DoDare.domain.Group;
import com.DoDare.domain.UserGroup;
import com.DoDare.dto.GroupDTO;
import com.DoDare.dto.UserGroupDTO;
import com.DoDare.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<GroupDTO> createGroup(@RequestBody GroupDTO groupDTO, @AuthenticationPrincipal UserDetails userDetails) {
        GroupDTO createdGroup = groupService.createGroup(groupDTO, userDetails.getUsername());
        return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<GroupDTO>> getAllGroupsForUser(@AuthenticationPrincipal UserDetails userDetails) {
        List<GroupDTO> groups = groupService.getAllGroupsForUser(userDetails.getUsername());
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @GetMapping("/usergroup/{groupId}")
    public ResponseEntity<UserGroupDTO> getUserGroup(@PathVariable Long groupId, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<UserGroupDTO> optionalUserGroupDTO = groupService.getUserGroup(groupId, userDetails.getUsername());
        return optionalUserGroupDTO.map(userGroupDTO -> new ResponseEntity<>(userGroupDTO, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> getGroup(@PathVariable Long groupId, @AuthenticationPrincipal UserDetails userDetails) {
        Optional<GroupDTO> optionalGroupDTO = groupService.getGroup(groupId, userDetails.getUsername());
        return optionalGroupDTO.map(groupDTO -> new ResponseEntity<>(groupDTO, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long groupId, @RequestBody GroupDTO groupDTO, @AuthenticationPrincipal UserDetails userDetails) {
        GroupDTO updatedGroup = groupService.updateGroup(groupId, groupDTO, userDetails.getUsername());
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId, @AuthenticationPrincipal UserDetails userDetails) {
        groupService.deleteGroup(groupId, userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
