package com.proconnect.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserGatewayController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String USER_SERVICE_URL = "http://localhost:8081/api/users";

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Object user) {
        try {
            ResponseEntity<Object> response = restTemplate.postForEntity(USER_SERVICE_URL + "/register", user, Object.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al redirigir al microservicio de usuarios: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Object loginRequest) {
        try {
            ResponseEntity<Object> response = restTemplate.postForEntity(USER_SERVICE_URL + "/login", loginRequest, Object.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al redirigir al microservicio de usuarios: " + e.getMessage());
        }
    }
}
