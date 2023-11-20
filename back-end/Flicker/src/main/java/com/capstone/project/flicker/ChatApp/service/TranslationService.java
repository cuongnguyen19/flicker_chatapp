package com.capstone.project.flicker.ChatApp.service;

import com.capstone.project.flicker.ChatApp.model.payload.OpenAITranslationRequest;
import com.capstone.project.flicker.ChatApp.model.payload.TranslationRequest;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.translate.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TranslationService {
    @Value("${google.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String openApiUrl;

    @Value("${openai.api.key}")
    private String openApiKey;

    private RestTemplate restTemplate = new RestTemplate();


    public String translate(String text, String targetLanguage) {
        try {
            Translate translate = TranslateOptions.newBuilder().setApiKey(apiKey).build().getService();
            Detection detection = translate.detect(text);
            String detectedLanguage = detection.getLanguage();
            if(detectedLanguage.equalsIgnoreCase(targetLanguage))
                return text;
            else {
                Translation translation = translate.translate(
                        text,
                        Translate.TranslateOption.sourceLanguage(detectedLanguage),
                        Translate.TranslateOption.targetLanguage(targetLanguage),
                        Translate.TranslateOption.format("text"));
                return translation.getTranslatedText();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to translate text", e);
        }
    }

    public List<Language> getSupportedLanguages() {
        Translate translate = TranslateOptions.newBuilder().setApiKey(apiKey).build().getService();
        List<Language> languages = translate.listSupportedLanguages();
        return languages;
    }

    public List<String> getSupportedLanguageNames() {
        List<Language> languages = getSupportedLanguages();
        List<String> languageNames = new ArrayList<>();
        languages.forEach(language -> {languageNames.add(language.getName());});
        return languageNames;
    }

    public List<String> getSupportedLanguageCodes() {
        List<Language> languages = getSupportedLanguages();
        List<String> languageCodes = new ArrayList<>();
        languages.forEach(language -> {languageCodes.add(language.getCode());});
        return languageCodes;
    }

    public Map<String, String> getSupportedLanguageCodesAndNames() {
        List<Language> languages = getSupportedLanguages();
        Map<String, String> languageCodesAndNames = new HashMap<>();
        languages.forEach(language -> {languageCodesAndNames.put(language.getCode(), language.getName());});
        return languageCodesAndNames;
    }


    public String generateText(TranslationRequest translationRequest) throws JsonProcessingException {
        OpenAITranslationRequest request = new OpenAITranslationRequest();
        request.setModel("gpt-3.5-turbo-instruct");
        request.setMax_tokens(1000);
        request.setPrompt("Translate the following text to " + translationRequest.getTargetLanguage() + ": '" + translationRequest.getText() + "'");

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openApiKey);

        // Body
        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);

        // Request entity
        HttpEntity<String> requestEntity = new HttpEntity<>(body, headers);

        // API request
        ResponseEntity<String> response = restTemplate.postForEntity(openApiUrl, requestEntity, String.class);

        // Process API response
        // Extract & return the generated text from the API response based on JSON structure
        // ...

        String result = response.getBody(); // Simplified, process the JSON as per your requirement

        // Parse the JSON string into a JsonNode
        JsonNode jsonNode = objectMapper.readTree(result);

        // Access JSON properties
        JsonNode choicesArray = jsonNode.get("choices");
        String text = "";
        // Iterate through the choices
        for (JsonNode choice : choicesArray) {
            text += choice.get("text").asText().replace("\n", "");;
        }
        return text;
    }
}
