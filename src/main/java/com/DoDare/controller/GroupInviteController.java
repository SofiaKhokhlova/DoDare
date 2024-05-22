package com.DoDare.controller;

import com.DoDare.domain.Group;
import com.DoDare.domain.GroupInviteToken;
import com.DoDare.domain.User;
import com.DoDare.repo.GroupInviteTokenRepository;
import com.DoDare.repo.UserRepository;
import com.DoDare.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping()
@RequiredArgsConstructor
public class GroupInviteController {

    private final GroupInviteTokenRepository groupInviteTokenRepository;
    private final GroupService groupService;
    private final UserRepository userRepository;

    @PostMapping("/join-group")
    public ResponseEntity<String> joinGroupWithInviteToken(@RequestParam UUID token,
                                                           @AuthenticationPrincipal UserDetails userDetails) {
        Optional<GroupInviteToken> optionalToken = groupInviteTokenRepository.findById(token);
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        if (optionalToken.isPresent() && optionalToken.get().getExpirationDate().isAfter(LocalDateTime.now())) {
            Group group = optionalToken.get().getGroup();
            groupService.addUserToGroup(optionalUser.get().getId(), group.getId());
            optionalToken.get().setExpirationDate(LocalDateTime.now().minusMinutes(1)); // Mark token as used
            groupInviteTokenRepository.save(optionalToken.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired invite token");
        }
    }

}
