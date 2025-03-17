package com.example.Device.service;

import com.example.Device.entity.Device;
import com.example.Device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    public DeviceRepository deviceRepository;

    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    public Device findById(Long id) {

        Optional<Device> device = deviceRepository.findById(id);

        if (device.isPresent()) {
            return device.get();
        }

        return null;
    }

    public List<Device> findByUserId(Long userId) {

        return deviceRepository.findAllDevicesByUserId(userId);

    }

    public Device insert(Device device) {
        return deviceRepository.save(device);
    }

    public Device update(Device device) throws Exception {
        Optional<Device> deviceAux = deviceRepository.findById(device.getDeviceId());
        if (deviceAux.isPresent()) {
            return deviceRepository.save(device);
        }
        throw new Exception("Device does not exist");
    }

    public void delete(Long deviceId) {
        deviceRepository.deleteById(deviceId);
    }

    public void deleteAllByUserId(Long userId) {
        deviceRepository.deleteAllDevicesByUserId(userId);
    }


}
