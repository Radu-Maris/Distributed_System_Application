package com.example.Monitoring.service;

import com.example.Monitoring.DTO.RecivedDTO;
import com.example.Monitoring.entity.Monitor;
import com.example.Monitoring.repository.MonitoringRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitoringService {

    @Autowired
    private MonitoringRepository monitoringRepository;

    public List<Monitor> getAllMonitorsByDeviceId(Long deviceId) {

        return monitoringRepository.findAllByDeviceId(deviceId);

    }

    public void save(RecivedDTO recivedDTO) {
        Monitor monitor = new Monitor();
        monitor.setDeviceId(recivedDTO.getDeviceId());
        monitor.setMeasurementValue(recivedDTO.getMeasurementValue());
        monitor.setTimestamp(recivedDTO.getTimestamp());

        monitoringRepository.save(monitor);
    }

}
