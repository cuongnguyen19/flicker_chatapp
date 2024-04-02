package com.capstone.project.flicker.ChatApp.repository;

import com.capstone.project.flicker.ChatApp.model.ArchivedConversation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface ArchivedConversationRepository extends JpaRepository<ArchivedConversation, Long> {
    Optional<ArchivedConversation> findByUserIdAndConversationId(Long userId, Long conversationId);
    Optional<ArchivedConversation> findById(Long archivedConversationId);
    Optional<ArchivedConversation> findByIdAndIsRemoved(Long archivedConversationId, Boolean isRemoved);
    Set<ArchivedConversation> findByUserIdAndIsRemoved(Long userId, Boolean isRemoved);
}
