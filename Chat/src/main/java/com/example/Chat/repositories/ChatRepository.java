package com.example.Chat.repositories;

import com.example.Chat.entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<ChatMessage, UUID> {

    List<ChatMessage> findBySender(String sender);

}
