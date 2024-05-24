package com.DoDare.mappers;

import com.DoDare.domain.Statistics;
import com.DoDare.dto.StatisticsDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StatisticsMapper {
    StatisticsDTO userStatisticsToUserStatisticsDTO(Statistics userStatistics);
    Statistics userStatisticsDTOToUserStatistics(StatisticsDTO userStatisticsDTO);
}
