package com.DoDare.controller.group;

import com.DoDare.dto.group.GroupDTO;
import com.DoDare.dto.group.UserGroupDTO;
import com.DoDare.service.group.GroupService;
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
    public ResponseEntity<GroupDTO> createGroup(@RequestBody GroupDTO groupDTO,
                                                @AuthenticationPrincipal UserDetails userDetails) {
        GroupDTO createdGroup = groupService.createGroup(groupDTO, userDetails.getUsername());
        return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<GroupDTO>> getAllGroupsForUser(@AuthenticationPrincipal UserDetails userDetails) {
        List<GroupDTO> groups = groupService.getAllGroupsForUser(userDetails.getUsername());
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @GetMapping("/users/{groupId}")
    public ResponseEntity<List<UserGroupDTO>> getAllUsersForGroup(@PathVariable Long groupId, @AuthenticationPrincipal UserDetails userDetails) {
        List<UserGroupDTO> users = groupService.getAllUsersForGroup(groupId, userDetails.getUsername());
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/usergroup/{groupId}")
    public ResponseEntity<UserGroupDTO> getUserGroup(@PathVariable Long groupId,
                                                     @AuthenticationPrincipal UserDetails userDetails) {
        Optional<UserGroupDTO> optionalUserGroupDTO = groupService.getUserGroup(groupId, userDetails.getUsername());
        return optionalUserGroupDTO.map(userGroupDTO -> new ResponseEntity<>(userGroupDTO, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{groupId}")
    public ResponseEntity<GroupDTO> getGroup(@PathVariable Long groupId,
                                             @AuthenticationPrincipal UserDetails userDetails) {
        Optional<GroupDTO> optionalGroupDTO = groupService.getGroup(groupId, userDetails.getUsername());
        return optionalGroupDTO.map(groupDTO -> new ResponseEntity<>(groupDTO, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{groupId}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long groupId, @RequestBody GroupDTO groupDTO,
                                                @AuthenticationPrincipal UserDetails userDetails) {
        GroupDTO updatedGroup = groupService.updateGroup(groupId, groupDTO, userDetails.getUsername());
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long groupId,
                                            @AuthenticationPrincipal UserDetails userDetails) {
        groupService.deleteGroup(groupId, userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{groupId}/invite")
    public ResponseEntity<String> generateGroupInviteLink(@PathVariable Long groupId,
                                                          @RequestParam(defaultValue = "7") int expirationDays,
                                                          @AuthenticationPrincipal UserDetails userDetails) {
        String inviteLink = groupService.generateGroupInviteLink(groupId, expirationDays, userDetails.getUsername());
        return ResponseEntity.ok(inviteLink);
    }

    @DeleteMapping("/{groupId}/{userId}")
    public ResponseEntity<Void> deleteUserFromGroup(@PathVariable Long groupId, @PathVariable Long userId,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        groupService.deleteUser(groupId, userId, userDetails.getUsername());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
