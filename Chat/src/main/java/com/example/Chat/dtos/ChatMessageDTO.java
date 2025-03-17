package com.example.Chat.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {

    private UUID id;
    private String receiver;
    private String sender;
    private String content;
    private String timestamp;
    private boolean readStatus;

}
