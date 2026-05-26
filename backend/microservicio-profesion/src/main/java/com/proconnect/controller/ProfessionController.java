package com.proconnect.controller;

import com.proconnect.model.Profession;
import com.proconnect.repository.ProfessionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professions")
@CrossOrigin(origins = "*")
public class ProfessionController {

    private final ProfessionRepository professionRepository;

    public ProfessionController(ProfessionRepository professionRepository) {
        this.professionRepository = professionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Profession>> getAllProfessions() {
        return ResponseEntity.ok(professionRepository.findAll());
    }
}
