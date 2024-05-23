package com.DoDare.repo;

import com.DoDare.domain.Statistics;
import com.DoDare.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    Optional<Statistics> findByUser(User user);
}
