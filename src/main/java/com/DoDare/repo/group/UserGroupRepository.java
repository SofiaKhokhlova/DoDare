package com.DoDare.repo.group;

import com.DoDare.domain.group.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    Optional<UserGroup> findByUserIdAndGroupId(Long userId, Long groupId);
    Optional<List<UserGroup>> findByUserId(Long userId);
    Optional<List<UserGroup>> findAllByGroupId(Long groupId);
}