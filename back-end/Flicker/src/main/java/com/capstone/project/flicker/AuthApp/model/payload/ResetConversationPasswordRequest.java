package com.capstone.project.flicker.AuthApp.model.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Schema(name = "Reset Password for Hidden Conversation Request", description = "The reset password for hidden conversation request payload")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResetConversationPasswordRequest {
    @NotBlank(message = "account password  can not be blank")
    @NotNull(message = "account password can not be null")
    @Schema(name = "A valid password", allowableValues = "NonEmpty String")
    private String accountPassword;

    @NotBlank(message = "conversation password can not be blank")
    @NotNull(message = "conversation password can not be null")
    @Schema(name = "A valid password", allowableValues = "NonEmpty String")
    private String conversationPassword;
}
