package com.DoDare.repo;

import com.DoDare.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<List<Task>> findByUser_Id(Long userId);
    Optional<Task> findById(Long taskId);
}
