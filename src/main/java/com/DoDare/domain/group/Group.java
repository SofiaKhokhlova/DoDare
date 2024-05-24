package com.DoDare.domain.group;

import com.DoDare.domain.Task;
import com.DoDare.domain.User;
import lombok.Data;
import jakarta.persistence.*;

import java.util.List;

@Data
@Entity
@Table(name = "Group_")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "ref_admin_user")
    private User adminUser;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserGroup> userGroups;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    public int getUsersCount() {
        return userGroups.size();
    }
}