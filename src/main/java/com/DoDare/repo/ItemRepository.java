package com.DoDare.repo;

import com.DoDare.domain.Item;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository  extends JpaRepository<Item, Long> {
    Optional<Item> findById(Long itemId);
}
