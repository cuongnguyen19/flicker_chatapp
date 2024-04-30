package com.capstone.project.flicker.ChatApp.model.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Schema(name = "Reveal Message Request", description = "The reveal message request payload")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevealedMessageRequest {
    @NotNull
    @NotBlank
    @Schema(name = "A valid password", required = true)
    private String password;
}
