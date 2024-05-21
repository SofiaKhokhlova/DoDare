package com.DoDare.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CharacterDTO {

    public CharacterDTO(Long userId, Long defaultHeadId, Long defaultBodyId, Long defaultLegsId) {
        this.userId = userId;
        headId = defaultHeadId;
        bodyId = defaultBodyId;
        legsId = defaultLegsId;
    }

    private Long id;
    private Long userId;
    private Long headId;
    private Long bodyId;
    private Long legsId;
}
