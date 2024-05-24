package com.DoDare.mappers.group;

import com.DoDare.domain.group.GroupStatistics;
import com.DoDare.dto.group.GroupStatisticsDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GroupStatisticsMapper {
    GroupStatisticsDTO groupStatisticsToGroupStatisticsDTO(GroupStatistics groupStatistics);
    GroupStatistics groupStatisticsDTOToGroupStatistics(GroupStatisticsDTO groupStatisticsDTO);
}
