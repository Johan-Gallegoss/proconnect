package com.proconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/professions")
@CrossOrigin(origins = "*")
public class ProfessionGatewayController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String PROFESSION_SERVICE_URL = "http://localhost:8082/api/professions";

    @GetMapping
    public ResponseEntity<?> getAllProfessions() {
        try {
            ResponseEntity<Object> response = restTemplate.getForEntity(PROFESSION_SERVICE_URL, Object.class);
            return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al redirigir al microservicio de profesiones: " + e.getMessage());
        }
    }
}
