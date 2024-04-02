package com.capstone.project.flicker.ChatApp.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FirebaseService {
    @Value("${google.service.account.file}")
    private String serviceAccountFile;
    @Value("${google.storage.bucket}")
    private String storageBucket;
    @Value("${google.firebase.database.url}")
    private String databaseUrl;
    @PostConstruct
    public void initialize() {
        try {
            FileInputStream serviceAccount = new FileInputStream(new ClassPathResource(serviceAccountFile).getFile());

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket(storageBucket)
                    .setDatabaseUrl(databaseUrl)
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
