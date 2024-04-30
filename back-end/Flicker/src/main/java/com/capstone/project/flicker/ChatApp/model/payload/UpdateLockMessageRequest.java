package com.capstone.project.flicker.ChatApp.model.payload;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Schema(name = "Update Lock Message Request", description = "The update lock message request payload")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateLockMessageRequest {
    @NotBlank(message = "Lock message status can not be blank")
    @NotNull(message = "Lock message status can not be null")
    @Schema(name = "A valid lock message status", allowableValues = "NonEmpty String")
    private Boolean lockMessage;
}
