package com.capstone.project.flicker.AuthApp.model.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Schema(name = "Set Password for Hidden Conversation Request", description = "The set password for hidden conversation request payload")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SetHiddenConversationPasswordRequest {
    @NotBlank(message = "password cannot be blank")
    @NotNull(message = "password cannot be null")
    @Schema(name = "A valid password", allowableValues = "NonEmpty String")
    private String password;
}
