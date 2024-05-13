package com.DoDare.service;

import com.DoDare.domain.Group;
import com.DoDare.domain.User;
import com.DoDare.domain.UserGroup;
import com.DoDare.dto.GroupDTO;
import com.DoDare.dto.UserGroupDTO;
import com.DoDare.mappers.GroupMapper;
import com.DoDare.mappers.UserGroupMapper;
import com.DoDare.repo.GroupRepository;
import com.DoDare.repo.UserGroupRepository;
import com.DoDare.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    public GroupDTO createGroup(GroupDTO groupDTO) {
        Group group = groupMapper.groupDTOToGroup(groupDTO);
        Group savedGroup = groupRepository.save(group);

        UserGroupDTO userGroupDTO = new UserGroupDTO();
        userGroupDTO.setUserId(savedGroup.getAdminUser().getId());
        userGroupDTO.setGroupId(savedGroup.getId());
        userGroupDTO.setPoints(0);
        addUserToGroup(userGroupDTO);

        return groupMapper.groupToGroupDTO(savedGroup);
    }

    public void addUserToGroup(UserGroupDTO userGroupDTO) {
        User user = userRepository.findById(userGroupDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Group group = groupRepository.findById(userGroupDTO.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(userGroupDTO.getUserId(), userGroupDTO.getGroupId());
        if (optionalUserGroup.isPresent()) {
            throw new RuntimeException("User already in the group");
        }

        UserGroup userGroup = userGroupMapper.userGroupDTOToUserGroup(userGroupDTO);

        userGroupRepository.save(userGroup);
    }

    public Optional<UserGroupDTO> getUserGroup(Long userId, Long groupId) {
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(userId, groupId);
        return optionalUserGroup.map(userGroupMapper::userGroupToUserGroupDTO);
    }

    public List<GroupDTO> getAllGroupsForUser(Long userId) {
        List<UserGroup> userGroups = userGroupRepository.findByUserId(userId).orElse(Collections.emptyList());
        return userGroups.stream()
                .map(UserGroup::getGroup)
                .map(groupMapper::groupToGroupDTO)
                .collect(Collectors.toList());
    }

    public List<UserGroupDTO> getUserGroupsForUser(Long userId) {
        List<UserGroup> userGroups = userGroupRepository.findByUserId(userId).orElse(Collections.emptyList());
        return userGroups.stream()
                .map(userGroupMapper::userGroupToUserGroupDTO)
                .collect(Collectors.toList());
    }

    public Optional<GroupDTO> getGroup(Long groupId) {
        return groupRepository.findById(groupId)
                .map(groupMapper::groupToGroupDTO);
    }

    public GroupDTO updateGroup(Long groupId, GroupDTO groupDTO) {
        Optional<Group> optionalGroup = groupRepository.findById(groupId);
        if (optionalGroup.isPresent()) {
            Group group = optionalGroup.get();
            groupMapper.updateGroupFromDTO(groupDTO, group);
            group.setId(groupId);
            Group savedGroup = groupRepository.save(group);
            return groupMapper.groupToGroupDTO(savedGroup);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found");
        }
    }

    public void deleteGroup(Long groupId) {
        groupRepository.deleteById(groupId);
    }

}