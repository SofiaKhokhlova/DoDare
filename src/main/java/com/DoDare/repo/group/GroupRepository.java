package com.DoDare.repo.group;

import com.DoDare.domain.group.Group;
import com.DoDare.domain.User;
import com.DoDare.domain.group.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findById(Long groupId);
    Optional<Group> findByUserGroupsContains(List<UserGroup> userGroups);
    Optional<Group> findByAdminUserAndId(User adminUser, Long id);
}