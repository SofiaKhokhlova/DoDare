package com.DoDare.repo;

import com.DoDare.domain.Character;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    Optional<Character> findById(Long characterId);
}
