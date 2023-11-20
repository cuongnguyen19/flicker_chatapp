package com.capstone.project.flicker.ChatApp.model.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Schema(name = "OpenAI Translation Request", description = "The OpenAI Translation request payload")
@Getter
@Setter
public class OpenAITranslationRequest {
    @NotNull
    @NotBlank
    @Schema(name = "A valid model", required = true)
    private String model;

    @NotNull
    @NotBlank
    @Schema(name = "A valid prompt", required = true)
    private String prompt;

    @NotNull
    @NotBlank
    @Schema(name = "A valid token", required = true)
    private Integer max_tokens;
}
