package com.capstone.project.flicker.ChatApp.controller;

import com.capstone.project.flicker.ChatApp.model.payload.TranscriptionRequest;
import com.capstone.project.flicker.ChatApp.service.TranscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transcribe")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TranscriptionController {
    @Autowired
    private TranscriptionService transcriptionService;

    @PostMapping(path = "/audio")
    public ResponseEntity<String> transcribeAudio (@RequestBody TranscriptionRequest request) {
        return ResponseEntity.ok(transcriptionService.transcribeAudio(request));
    }
}
