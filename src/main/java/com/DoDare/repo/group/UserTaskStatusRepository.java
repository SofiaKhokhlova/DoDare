package com.DoDare.repo.group;

import com.DoDare.domain.Task;
import com.DoDare.domain.User;
import com.DoDare.domain.group.UserTaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserTaskStatusRepository extends JpaRepository<UserTaskStatus, Long> {
    Optional<UserTaskStatus> findByUserAndTask(User user, Task task);
    Optional<List<UserTaskStatus>> findAllByTask(Task task);
    Optional<List<UserTaskStatus>> findAllByUserId(Long userId);
}