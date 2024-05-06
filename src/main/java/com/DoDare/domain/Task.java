package com.DoDare.domain;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", unique = true, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Long reward;

    @Column
    private Date deadline;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

}
