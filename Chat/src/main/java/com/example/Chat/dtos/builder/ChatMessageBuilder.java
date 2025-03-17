package com.example.Chat.dtos.builder;

import com.example.Chat.dtos.ChatMessageDTO;
import com.example.Chat.entities.ChatMessage;

public class ChatMessageBuilder {

    public static ChatMessage toEntity(ChatMessageDTO chatMessageDTO){
        return new ChatMessage(chatMessageDTO.getId(),chatMessageDTO.getReceiver(),chatMessageDTO.getSender(),chatMessageDTO.getContent(), chatMessageDTO.getTimestamp(), chatMessageDTO.isReadStatus());
    }

    public static ChatMessageDTO toChatMessageDTO(ChatMessage chatMessage){
        return new ChatMessageDTO(chatMessage.getId(),chatMessage.getReceiver(),chatMessage.getSender(),chatMessage.getContent(), chatMessage.getTimestamp(), chatMessage.isReadStatus());
    }
}
