package com.DoDare.repo;

import com.DoDare.domain.GroupInviteToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GroupInviteTokenRepository extends JpaRepository<GroupInviteToken, UUID> {
}
