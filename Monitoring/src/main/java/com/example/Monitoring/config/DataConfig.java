package com.example.Monitoring.config;

import com.example.Monitoring.DTO.RecivedDTO;
import com.example.Monitoring.service.MonitoringService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@EnableRabbit
@Component
public class DataConfig {


    private final MonitoringService monitoringService;
    private final ObjectMapper objectMapper;

    public DataConfig(MonitoringService monitoringService, ObjectMapper objectMapper) {
        this.monitoringService = monitoringService;
        this.objectMapper = objectMapper;
    }

    @RabbitListener(queues = "#{rabbitConfig.name}")
    public void handleMessage(String message) {
        System.out.println("Received message: " + message);

        try {

            RecivedDTO recivedDTO = objectMapper.readValue(message, RecivedDTO.class);
            this.monitoringService.save(recivedDTO);

        } catch (Exception e) {
            System.err.println("Failed to process message: " + e.getMessage());
        }
    }
}
