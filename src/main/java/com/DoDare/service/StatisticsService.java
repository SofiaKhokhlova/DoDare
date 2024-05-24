package com.DoDare.service;

import com.DoDare.domain.Statistics;
import com.DoDare.domain.User;
import com.DoDare.dto.StatisticsDTO;
import com.DoDare.mappers.StatisticsMapper;
import com.DoDare.repo.StatisticsRepository;
import com.DoDare.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class StatisticsService {

    private final StatisticsRepository statisticsRepository;
    private final UserRepository userRepository;
    private final StatisticsMapper statisticsMapper;

    public StatisticsDTO getUserStatistics(String email) {
        User user = userRepository.findByEmail(email).get();
        Statistics statistics = statisticsRepository.findByUser(user)
                .orElseGet(() -> createUserStatistics(user));
        return statisticsMapper.userStatisticsToUserStatisticsDTO(statistics);
    }

    public Statistics createUserStatistics(User user) {
        Statistics statistics = new Statistics();
        statistics.setUser(user);
        statistics.setCompletedTasks(0);
        statistics.setCompletedAchievements(0);
        statistics.setRegistrationDate(LocalDate.now());
        return statisticsRepository.save(statistics);
    }

    public void updateCompletedTasks(User user) {
        Statistics userStatistics = statisticsRepository.findByUser(user)
                .orElseGet(() -> createUserStatistics(user));
        userStatistics.setCompletedTasks(userStatistics.getCompletedTasks() + 1);
        statisticsRepository.save(userStatistics);
    }

    public void updateCompletedAchievements(User user) {
        Statistics userStatistics = statisticsRepository.findByUser(user)
                .orElseGet(() -> createUserStatistics(user));
        userStatistics.setCompletedAchievements(userStatistics.getCompletedAchievements() + 1);
        statisticsRepository.save(userStatistics);
    }

}