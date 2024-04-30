package com.capstone.project.flicker.ChatApp.model.dto;

import com.capstone.project.flicker.ChatApp.model.Message;
import com.capstone.project.flicker.ChatApp.model.MessageType;
import com.capstone.project.flicker.AuthApp.model.User;
import com.capstone.project.flicker.ChatApp.model.File;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class MessageDTO {
    private Long id;
    private String content;
    private MessageType messageType;
    private User sender;
    private Set<File> files;
    private Message.Status status;
    private Boolean deleted;
    private Boolean locked;
    private Instant createdAt;
}
