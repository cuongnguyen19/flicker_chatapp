package com.capstone.project.flicker.ChatApp.model.payload;

import com.capstone.project.flicker.ChatApp.model.MessageType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Schema(name = "Send Message Request", description = "The send message request payload")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SendMessageRequest {
    @NotNull
    @NotBlank
    @Schema(name = "A valid message content", required = true)
    private String content;

    @Schema(name = "A valid message locked content")
    private String lockedContent;

    @Schema(name = "A valid message locked status")
    private Boolean locked;

    @NotNull
    @Schema(name = "A valid message type", required = true)
    private MessageType messageType;

    @Schema(name = "A valid message file", required = true)
    private Set<Long> fileIds;

}
