package com.example.Chat.services;

import org.springframework.stereotype.Service;
import com.example.Chat.dtos.ChatMessageDTO;
import com.example.Chat.dtos.builder.ChatMessageBuilder;
import com.example.Chat.entities.ChatMessage;
import com.example.Chat.repositories.ChatRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class ChatService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChatService.class);

    private final ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Transactional
    public List<ChatMessageDTO> findChatsBySenderOrReceiver(String sender){
        List<ChatMessage> chatMessageListAux = chatRepository.findAll();
        List<ChatMessage> chatMessageList = new ArrayList<>();
        for(ChatMessage chatMessage : chatMessageListAux){
            if(chatMessage.getSender().equals(sender) || chatMessage.getReceiver().equals(sender)){
                chatMessageList.add(chatMessage);
            }
        }
        chatMessageList.sort(Comparator.comparing(ChatMessage::getTimestamp));
        return chatMessageList.stream()
                .map(ChatMessageBuilder::toChatMessageDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public UUID insert(ChatMessageDTO chatMessageDTO) {
        ChatMessage chatMessage = ChatMessageBuilder.toEntity(chatMessageDTO);
        chatMessage.setReadStatus(false);
        chatMessage = chatRepository.save(chatMessage);
        LOGGER.debug("ChatMessage with id {} was inserted in db", chatMessage.getId());
        return chatMessage.getId();
    }

    @Transactional
    public String markMessagesAsRead(String clientId){
        List<ChatMessage> chatMessageListAux = chatRepository.findAll();
        for(ChatMessage chatMessage : chatMessageListAux){
            if(chatMessage.getSender().equals(clientId)){
                chatMessage.setReadStatus(true);
                chatRepository.save(chatMessage);
            }
        }
        return clientId;
    }

}
