package com.example.Chat.controller;

import com.example.Chat.dtos.ChatMessageDTO;
import com.example.Chat.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessageDTO sendMessage(ChatMessageDTO message) {
        chatService.insert(message);
        return message;
    }

    @MessageMapping("/typing")
    @SendTo("/topic/typing")
    public Map<String, Object> notifyTyping(@RequestBody Map<String, Object> typingInfo) {
        return typingInfo;
    }

    @GetMapping("/api/messages/{sender}")
    public List<ChatMessageDTO> getAllMessages(@PathVariable("sender") String sender) {
        return chatService.findChatsBySenderOrReceiver(sender);
    }

    @PutMapping("/api/markRead/{clientData}")
    public String markAsRead(@PathVariable("clientData") String clientData) {
        String notification = chatService.markMessagesAsRead(clientData);
        simpMessagingTemplate.convertAndSend("/topic/readReceipt",
                Collections.singletonMap("message", clientData + " read your message."));
        return notification;
    }


}
