package com.DoDare.repo.group;

import com.DoDare.domain.group.GroupStatistics;
import com.DoDare.domain.group.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupStatisticsRepository extends JpaRepository<GroupStatistics, Long> {
    Optional<GroupStatistics> findByGroup(Group group);
}
