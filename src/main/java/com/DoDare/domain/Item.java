package com.DoDare.domain;

import com.DoDare.enums.ItemType;
import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    @Enumerated(EnumType.ORDINAL)
    private ItemType type;

    @Column(nullable = false)
    private int price;
}
