package com.example.Device.controller;


import com.example.Device.entity.Device;
import com.example.Device.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/device")
@CrossOrigin(origins = "http://localhost:5173")
public class DeviceController {

    @Autowired
    public DeviceService deviceService;

    @GetMapping("/getAll")
    @ResponseBody
    public List<Device> getAll() {
        return deviceService.findAll();
    }

    @GetMapping("/getDeviceById/{id}")
    @ResponseBody
    public Device getDeviceById(@PathVariable Long id) {
        return deviceService.findById(id);
    }

    @GetMapping("/getDevicesOfUser/{id}")
    @ResponseBody
    public List<Device> getDevicesOfUser(@PathVariable Long id) {
        return deviceService.findByUserId(id);
    }

    @PostMapping("/insertDevice")
    @ResponseBody
    public Device insertDevice(@RequestBody Device device) {
        return deviceService.insert(device);
    }

    @PutMapping("/updateDevice")
    @ResponseBody
    public Device updateDevice(@RequestBody Device device) throws Exception {
        return deviceService.update(device);
    }

    @DeleteMapping("/deleteDevice/{id}")
    @ResponseBody
    public void deleteDevice(@PathVariable Long id) {
        deviceService.delete(id);
    }

    @DeleteMapping("/deleteAllDevicesOfUser/{id}")
    @ResponseBody
    public void deleteAllDevicesOfUser(@PathVariable Long id) {
        deviceService.deleteAllByUserId(id);
    }

}
