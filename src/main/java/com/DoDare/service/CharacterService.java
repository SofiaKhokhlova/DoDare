package com.DoDare.service;

import com.DoDare.dto.CharacterDTO;
import com.DoDare.dto.UserDTO;
import com.DoDare.mappers.CharacterMapper;
import com.DoDare.domain.Character;
import com.DoDare.repo.CharacterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterMapper characterMapper;
    private final CharacterRepository characterRepository;

    // these items MUST already exist before registration a new user
    // TODO: add these items to the every new user's inventory on registration
    // TODO: move this values to some config file
    static Long defaultHeadId = 1L;
    static Long defaultBodyId = 2L;
    static Long defaultLegsId = 3L;


    // should be used only while registering a new user
    public CharacterDTO createCharacter(UserDTO userDTO) {
        CharacterDTO newCharacterDTO = new CharacterDTO(userDTO.getId(), defaultHeadId, defaultBodyId, defaultLegsId);
        Character newCharacter = characterMapper.characterDtoToCharacter(newCharacterDTO);
        Character savedCharacter = characterRepository.save(newCharacter);
        return characterMapper.characterToCharacterDto(savedCharacter);
    }
}
