package com.DoDare.domain;

import lombok.Data;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int status;

    @Column(nullable = false)
    private int reward;

    @Column(name = "due_date", nullable = false)
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "ref_user", nullable = false)
    private User user;
}