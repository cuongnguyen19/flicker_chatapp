package com.capstone.project.flicker.ChatApp.service;

import com.capstone.project.flicker.ChatApp.repository.HiddenConversationRepository;
import com.capstone.project.flicker.ChatApp.model.HiddenConversation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class HiddenConversationService {
    @Autowired
    private HiddenConversationRepository hiddenConversationRepository;

    public Optional<HiddenConversation> findById(Long hiddenConversationId) {
        return hiddenConversationRepository.findById(hiddenConversationId);
    }
    public Optional<HiddenConversation> findByUserIdAndConversationId(Long userId, Long conversationId) {
        return hiddenConversationRepository.findByUserIdAndConversationId(userId, conversationId);
    }

    public HiddenConversation save (HiddenConversation hiddenConversation) {
        return hiddenConversationRepository.save(hiddenConversation);
    }

    public void delete (HiddenConversation hiddenConversation) {
        hiddenConversationRepository.delete(hiddenConversation);
    }

    public List<HiddenConversation> findAll() {
        return hiddenConversationRepository.findAll();
    }

    public Set<HiddenConversation> findByUserId(Long userId) {
        return hiddenConversationRepository.findByUserIdOrderByUpdatedAtDesc(userId);
    }
}
