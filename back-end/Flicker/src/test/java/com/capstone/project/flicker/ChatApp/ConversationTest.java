package com.capstone.project.flicker.ChatApp;

import com.capstone.project.flicker.AuthApp.model.User;
import com.capstone.project.flicker.AuthApp.model.payload.LoginRequest;
import com.capstone.project.flicker.ChatApp.model.Conversation;
import com.capstone.project.flicker.ChatApp.model.dto.PageDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(MockitoExtension.class)
public class ConversationTest extends BaseTest{
    @Test
    public void testCreatePrivateChat() throws Exception {
        User user1 = getOrCreateUser("HCN", "");
        User user2 = getOrCreateUser("NHC", "");

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(user1.getEmail());
        loginRequest.setPassword("123456");
        loginRequest.setDeviceInfo(getDeviceInfo());

        String token = loginAndGetToken(loginRequest);

        // Perform the POST request to create a conversation
        MvcResult mvcResult = mockMvc.perform(
                MockMvcRequestBuilders
                        .post(BASE_URL + "/api/conversation/create/private-chat?userId2=" + user2.getId())
                        .header("Authorization", "Bearer " + token)  // Set the authorization header
                        .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(MockMvcResultMatchers.status().isOk())
                        .andReturn();

        String jsonResponse = mvcResult.getResponse().getContentAsString();

        Conversation conversation = objectMapper.readValue(jsonResponse, Conversation.class);
        assertEquals(2, conversation.getUsers().size());
        assertFalse(conversation.getIsGroup());

        logout(token);
    }

    @Test
    public void testGetConversations() throws Exception {
        User user1 = getOrCreateUser("HCN", "");
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(user1.getEmail());
        loginRequest.setPassword("123456");
        loginRequest.setDeviceInfo(getDeviceInfo());

        String token = loginAndGetToken(loginRequest);

        // Perform the POST request to create a conversation
        MvcResult mvcResult = mockMvc.perform(
                        MockMvcRequestBuilders
                                .get(BASE_URL + "/api/conversation/get")
                                .header("Authorization", "Bearer " + token)  // Set the authorization header
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        String responseContent = mvcResult.getResponse().getContentAsString();

        PageDTO<Conversation> conversations = objectMapper.readValue(responseContent, PageDTO.class);

        assertEquals(2, conversations.getContent().size());
        assertEquals(10, conversations.getSize());
        assertEquals(2L, conversations.getTotalElements());

        logout(token);
    }

    @Test
    public void testSearchConversation() throws Exception {
        User user1 = getOrCreateUser("HCN", "");
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(user1.getEmail());
        loginRequest.setPassword("123456");
        loginRequest.setDeviceInfo(getDeviceInfo());

        String token = loginAndGetToken(loginRequest);

        String query = "NHC";

        // Perform the POST request to create a conversation
        MvcResult mvcResult = mockMvc.perform(
                        MockMvcRequestBuilders
                                .get(BASE_URL + "/api/conversation/search?query=" + query)
                                .header("Authorization", "Bearer " + token)  // Set the authorization header
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        String responseContent = mvcResult.getResponse().getContentAsString();

        PageDTO<Conversation> conversations = objectMapper.readValue(responseContent, PageDTO.class);

        assertEquals(1, conversations.getContent().size());
        assertEquals(10, conversations.getSize());
        assertEquals(1L, conversations.getTotalElements());

        logout(token);
    }
}
