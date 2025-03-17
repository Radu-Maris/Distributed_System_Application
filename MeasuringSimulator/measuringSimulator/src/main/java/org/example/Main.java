package org.example;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileReader;
import java.time.LocalDateTime;

public class Main {
    private static final String QUEUE_NAME = "sensor_data_queue";

    public static void main(String[] args) {
        String csvFilePath = "D://Facultate//An_4//Sem1//DS//MeasuringSimulator//sensor.csv";
        String amqpUrl = "amqps://nefzzndw:wrhTFvglz3gcz9WUlupejJmE2sykZA1s@sparrow.rmq.cloudamqp.com/nefzzndw";

        ConnectionFactory factory = new ConnectionFactory();
        try {
            factory.setUri(amqpUrl);

            try (Connection connection = factory.newConnection();
                 Channel channel = connection.createChannel();
                 BufferedReader reader = new BufferedReader(new FileReader(csvFilePath))) {

                channel.queueDeclare(QUEUE_NAME, true, false, false, null);

                String line;
                int currentRow = 0;
                int skipRows = 6;

                boolean isHeader = true;
                Double lastValue = null;

                while ((line = reader.readLine()) != null) {
                    if (isHeader) {
                        isHeader = false;
                        continue;
                    }

                    currentRow++;
                    if (currentRow % skipRows == 0) {
                        String[] fields = line.split(",");
                        double currentValue = Double.parseDouble(fields[0].trim());

                        if (lastValue != null) {
                            double difference = currentValue - lastValue;

                            JSONObject jsonMessage = new JSONObject();
                            jsonMessage.put("timestamp", LocalDateTime.now());
                            jsonMessage.put("device_id", "23");
                            jsonMessage.put("measurement_value", difference);

                            String jsonString = jsonMessage.toString();
                            channel.basicPublish("", QUEUE_NAME, null, jsonString.getBytes());
                            System.out.println("Sent: " + jsonString);
                        }

                        lastValue = currentValue;

                        Thread.sleep(1000);
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
