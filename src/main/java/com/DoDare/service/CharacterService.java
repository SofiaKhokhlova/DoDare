package com.DoDare.service;

import com.DoDare.domain.Item;
import com.DoDare.domain.User;
import com.DoDare.dto.CharacterDTO;
import com.DoDare.dto.UserDTO;
import com.DoDare.enums.ItemType;
import com.DoDare.mappers.CharacterMapper;
import com.DoDare.domain.Character;
import com.DoDare.repo.CharacterRepository;
import com.DoDare.repo.ItemRepository;
import com.DoDare.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterMapper characterMapper;
    private final CharacterRepository characterRepository;
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final InventoryService inventoryService;

    // these items MUST already exist before registration a new user
    // TODO: add these items to the every new user's inventory on registration
    // TODO: move this values to some config file

    @Setter
    static Long defaultHeadId = 1L;

    @Setter
    static Long defaultBodyId = 2L;

    @Setter
    static Long defaultLegsId = 3L;



    // should be used only while registering a new user
    public CharacterDTO createCharacter(UserDTO userDTO) {
        CharacterDTO newCharacterDTO = new CharacterDTO(userDTO.getId(), defaultHeadId, defaultBodyId, defaultLegsId);
        Character newCharacter = characterMapper.characterDtoToCharacter(newCharacterDTO);
        Character savedCharacter = characterRepository.save(newCharacter);
        return characterMapper.characterToCharacterDto(savedCharacter);
    }

    public Optional<CharacterDTO> getCharacter(Long userId) {

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return Optional.empty();
        }
        User user = userOptional.get();
        return Optional.of(characterMapper.characterToCharacterDto(user.getCharacter()));
    }

    public boolean equipItem(String userEmail, Long itemId) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        Optional<Item> itemOptional = itemRepository.findById(itemId);
        if (userOptional.isEmpty() || itemOptional.isEmpty()) {
            return false;
        }
        User user = userOptional.get();
        Item item = itemOptional.get();

        Character character = user.getCharacter();

        if (!inventoryService.doesPossessItem(user.getId(), itemId)) {
            return false;
        }

        if (item.getType() == ItemType.HEAD) {
            character.setHead(item);
        }
        else if (item.getType() == ItemType.BODY) {
            character.setBody(item);
        }
        else {
            character.setLegs(item);
        }
        characterRepository.save(character);
        return true;
    }
}
