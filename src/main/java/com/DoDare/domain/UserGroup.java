package com.DoDare.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "UserGroup")
public class UserGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int points;

    @ManyToOne
    @JoinColumn(name = "ref_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "ref_group")
    private Group group;

}
