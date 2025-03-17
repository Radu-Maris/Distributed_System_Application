package com.example.Device.repository;

import com.example.Device.entity.Device;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Transactional
public interface DeviceRepository extends CrudRepository<Device, Long> {

    List<Device> findAll();

    List<Device> findAllDevicesByUserId(Long userId);

    void deleteAllDevicesByUserId(Long userId);

}
