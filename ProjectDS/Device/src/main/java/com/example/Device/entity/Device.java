package com.example.Device.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "devices")

public class Device {

    @Id
    @Column(name = "device_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deviceId;

    @Column(name = "device_name")
    private String deviceName;

    @Column(name = "device_address")
    private String deviceAddress;

    @Column(name = "device_description")
    private String deviceDescription;

    @Column(name = "device_max_h_consumption")
    private Long deviceMaxConsumption;

    @Column(name = "user_id")
    private Long userId;

}
