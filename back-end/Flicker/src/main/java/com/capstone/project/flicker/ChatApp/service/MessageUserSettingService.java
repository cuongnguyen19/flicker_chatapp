package com.capstone.project.flicker.ChatApp.service;

import com.capstone.project.flicker.ChatApp.repository.MessageUserSettingRepository;
import com.capstone.project.flicker.ChatApp.model.MessageUserSetting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class MessageUserSettingService {
    @Autowired
    private MessageUserSettingRepository messageUserSettingRepository;

    public Set<MessageUserSetting> findByUserIdAndConversationId(Long userId, Long conversationId) {
        return messageUserSettingRepository.findByUserIdAndConversationId(userId, conversationId);
    }

    public Set<MessageUserSetting> findUnseenMessages(Long userId, Long conversationId) {
        return messageUserSettingRepository.findUnseenMessages(userId, conversationId);
    }

    public Optional<MessageUserSetting> findByUserIdAndMessageId(Long userId, Long messageId) {
        return messageUserSettingRepository.findByUserIdAndMessageId(userId, messageId);
    }

    public Set<MessageUserSetting> findByMessageIdAndConversationId(Long messageId, Long conversationId) {
        return messageUserSettingRepository.findByMessageIdAndConversationId(messageId, conversationId);
    }

    public Optional<MessageUserSetting> findByUserIdAndMessageIdAndConversationId(Long userId, Long messageId, Long conversationId) {
        return messageUserSettingRepository.findByUserIdAndMessageIdAndConversationId(userId, messageId, conversationId);
    }

    public MessageUserSetting save(MessageUserSetting mus) {
        return messageUserSettingRepository.save(mus);
    }
}
