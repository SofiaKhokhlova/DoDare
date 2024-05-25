package com.DoDare.service.group;

import com.DoDare.domain.group.Group;
import com.DoDare.domain.group.GroupInviteToken;
import com.DoDare.domain.User;
import com.DoDare.domain.group.UserGroup;
import com.DoDare.domain.group.UserTaskStatus;
import com.DoDare.dto.group.GroupDTO;
import com.DoDare.dto.group.UserGroupDTO;
import com.DoDare.mappers.group.GroupMapper;
import com.DoDare.mappers.group.UserGroupMapper;
import com.DoDare.repo.group.GroupInviteTokenRepository;
import com.DoDare.repo.group.GroupRepository;
import com.DoDare.repo.group.UserGroupRepository;
import com.DoDare.repo.UserRepository;
import com.DoDare.repo.group.UserTaskStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final UserGroupRepository userGroupRepository;
    private final GroupMapper groupMapper;
    private final UserGroupMapper userGroupMapper;
    private final GroupInviteTokenRepository groupInviteTokenRepository;
    private final UserTaskStatusRepository userTaskStatusRepository;

    public GroupDTO createGroup(GroupDTO groupDTO, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Group group = groupMapper.groupDTOToGroup(groupDTO);
        group.setAdminUser(optionalUser.get());
        Group savedGroup = groupRepository.save(group);

        addUserToGroup(savedGroup.getAdminUser().getId(), savedGroup.getId());

        return groupMapper.groupToGroupDTO(savedGroup);
    }

    public void addUserToGroup(Long userId, Long groupId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(userId, groupId);
        if (optionalUserGroup.isPresent()) {
            throw new RuntimeException("User already in the group");
        }

        UserGroupDTO userGroupDTO = new UserGroupDTO();
        userGroupDTO.setUserId(userId);
        userGroupDTO.setGroupId(groupId);
        userGroupDTO.setPoints(0);
        UserGroup userGroup = userGroupMapper.userGroupDTOToUserGroup(userGroupDTO);

        userGroupRepository.save(userGroup);
    }

    public Optional<UserGroupDTO> getUserGroup(Long groupId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(optionalUser.get().getId(), groupId);
        return optionalUserGroup.map(userGroupMapper::userGroupToUserGroupDTO);
    }

    public List<GroupDTO> getAllGroupsForUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        List<UserGroup> userGroups = userGroupRepository.findByUserId(optionalUser.get().getId()).orElse(Collections.emptyList());
        return userGroups.stream()
                .map(UserGroup::getGroup)
                .map(groupMapper::groupToGroupDTO)
                .collect(Collectors.toList());
    }

    public Optional<GroupDTO> getGroup(Long groupId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(optionalUser.get().getId(), groupId);
        return groupRepository.findByUserGroupsContains(Collections.singletonList(optionalUserGroup.orElse(null)))
                .map(groupMapper::groupToGroupDTO);
    }

    public GroupDTO updateGroup(Long groupId, GroupDTO groupDTO, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Group group = groupRepository.findByAdminUserAndId(optionalUser.get(), groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        groupMapper.updateGroupFromDTO(groupDTO, group);
        group.setId(groupId);
        Group savedGroup = groupRepository.save(group);
        return groupMapper.groupToGroupDTO(savedGroup);
    }

    public void deleteGroup(Long groupId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Optional<Group> optionalGroup = groupRepository.findByAdminUserAndId(optionalUser.get(), groupId);
        optionalGroup.ifPresent(groupRepository::delete);
    }

    public String generateGroupInviteLink(Long groupId, int expirationDays, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(optionalUser.get().getId(), groupId);
        Group group = groupRepository.findByUserGroupsContains(Collections.singletonList(optionalUserGroup.orElse(null)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));

        GroupInviteToken inviteToken = new GroupInviteToken();
        inviteToken.setGroup(group);
        inviteToken.setExpirationDate(LocalDateTime.now().plusDays(expirationDays));

        GroupInviteToken savedToken = groupInviteTokenRepository.save(inviteToken);

        // Build the invite link using the saved token
        return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString() + "/join-group?token=" + savedToken.getToken();
    }

    public void deleteUser(Long groupId, Long userId, String email) {
        User user = userRepository.findByEmail(email).get();
        Group group = groupRepository.findByAdminUserAndId(user, groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(userId, groupId);
        optionalUserGroup.ifPresent(userGroupRepository::delete);
        List<UserTaskStatus> userTasks = userTaskStatusRepository.findAllByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group users tasks not found"));

        userTaskStatusRepository.deleteAll(userTasks);
    }

    public List<UserGroupDTO> getAllUsersForGroup(Long groupId, String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(optionalUser.get().getId(), groupId);
        Group group = groupRepository.findByUserGroupsContains(Collections.singletonList(optionalUserGroup.orElse(null)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));

        return userGroupMapper.userGroupsToUserGroupDTOs(group.getUserGroups());
    }
}