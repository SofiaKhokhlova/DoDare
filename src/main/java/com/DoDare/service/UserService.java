package com.DoDare.service;

import com.DoDare.domain.Item;
import com.DoDare.domain.User;
import com.DoDare.dto.CredentialsDTO;
import com.DoDare.dto.SignUpDTO;
import com.DoDare.dto.UserDTO;
import com.DoDare.exceptions.AppException;
import com.DoDare.mappers.UserMapper;
import com.DoDare.repo.ItemRepository;
import com.DoDare.repo.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class UserService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final CharacterService characterService;
    private final ItemService itemService;

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public UserDTO login(CredentialsDTO credentialsDto) {
        User user = userRepository.findByEmail(credentialsDto.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDTO register(SignUpDTO userDto) {
        Optional<User> optionalUser = userRepository.findByEmail(userDto.getEmail());

        if (optionalUser.isPresent()) {
            throw new AppException("User with such email already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);

        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        User savedUser = userRepository.save(user);
        UserDTO savedUserDTO = userMapper.toUserDto(savedUser);

        characterService.createCharacter(savedUserDTO);

        return savedUserDTO;
    }

    public boolean addPoints(Long userId, Long points) {
        if (points < 0) {
//            throw new IllegalArgumentException("addPoints is designed to increase amount of points, " +
//                    "and the argument is negative");
            return false;
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return false;
        }
        User user = userOptional.get();
        user.setPoints(user.getPoints() + points);
        userRepository.save(user);
        return true;
    }

    public boolean takePoints(Long userId, Long points) {
        if (points < 0) {
//            throw new IllegalArgumentException("addPoints is designed to increase amount of points, " +
//                    "and the argument is negative");
            return false;
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();
        if (user.getPoints() < points) {
            return false;
        }
        user.setPoints(user.getPoints() - points);
        userRepository.save(user);
        return true;
    }


}
