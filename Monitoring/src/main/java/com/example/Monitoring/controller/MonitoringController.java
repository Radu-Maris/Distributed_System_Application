package com.example.Monitoring.controller;

import com.example.Monitoring.entity.Monitor;
import com.example.Monitoring.repository.MonitoringRepository;
import com.example.Monitoring.service.MonitoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/monitor")
@CrossOrigin
public class MonitoringController {

    @Autowired
    public MonitoringService monitoringService;

    @GetMapping("/getAllByDeviceId/{deviceId}")
    @ResponseBody
    public List<Monitor> getAllByDeviceId(@PathVariable("deviceId") Long deviceId) {

        return monitoringService.getAllMonitorsByDeviceId(deviceId);

    }

}
