package com.example.Monitoring.repository;

import com.example.Monitoring.entity.Monitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitoringRepository extends JpaRepository<Monitor, Long> {

    List<Monitor> findAllByDeviceId(Long id);

}
