package com.DoDare.service.group;

import com.DoDare.domain.User;
import com.DoDare.domain.group.Group;
import com.DoDare.domain.group.GroupStatistics;
import com.DoDare.domain.group.UserGroup;
import com.DoDare.dto.group.GroupStatisticsDTO;
import com.DoDare.mappers.group.GroupStatisticsMapper;
import com.DoDare.repo.UserRepository;
import com.DoDare.repo.group.GroupRepository;
import com.DoDare.repo.group.GroupStatisticsRepository;
import com.DoDare.repo.group.UserGroupRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class GroupStatisticsService {

    private final GroupStatisticsRepository groupStatisticsRepository;
    private final GroupRepository groupRepository;
    private final UserRepository userRepository;
    private final UserGroupRepository userGroupRepository;
    private final GroupStatisticsMapper groupStatisticsMapper;

    public GroupStatisticsDTO getGroupStatistics(Long groupId, String email) {
        User user = userRepository.findByEmail(email).get();
        Optional<UserGroup> optionalUserGroup = userGroupRepository.findByUserIdAndGroupId(user.getId(), groupId);
        Group group = groupRepository.findByUserGroupsContains(Collections.singletonList(optionalUserGroup.orElse(null)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        GroupStatistics groupStatistics = groupStatisticsRepository.findByGroup(group)
                .orElseGet(() -> createGroupStatistics(group));

        return groupStatisticsMapper.groupStatisticsToGroupStatisticsDTO(groupStatistics);
    }

    public GroupStatistics createGroupStatistics(Group group) {
        GroupStatistics groupStatistics = new GroupStatistics();
        groupStatistics.setGroup(group);
        groupStatistics.setCompletedTasks(0);
        groupStatistics.setCompletedAchievements(0);
        groupStatistics.setCreatedDate(LocalDate.now());
        return groupStatisticsRepository.save(groupStatistics);
    }

    public void updateCompletedAchievements(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        GroupStatistics groupStatistics = groupStatisticsRepository.findByGroup(group)
                .orElseGet(() -> createGroupStatistics(group));
        groupStatistics.setCompletedAchievements(groupStatistics.getCompletedAchievements() + 1);
        groupStatisticsRepository.save(groupStatistics);
    }

    public void updateCompletedTasks(Long groupId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Group not found"));
        GroupStatistics groupStatistics = groupStatisticsRepository.findByGroup(group)
                .orElseGet(() -> createGroupStatistics(group));
        groupStatistics.setCompletedTasks(groupStatistics.getCompletedTasks() + 1);
        groupStatisticsRepository.save(groupStatistics);
    }

}