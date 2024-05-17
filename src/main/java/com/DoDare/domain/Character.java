package com.DoDare.domain;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "Character_")
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "head", nullable = false)
    private Item hat;

    @ManyToOne
    @JoinColumn(name = "body", nullable = false)
    private Item body;

    @ManyToOne
    @JoinColumn(name = "legs", nullable = false)
    private Item legs;
}
