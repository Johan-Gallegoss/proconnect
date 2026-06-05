package com.proconnect.service;

import com.proconnect.model.Role;
import com.proconnect.model.User;
import com.proconnect.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final com.proconnect.repository.ProfessionRepository professionRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, com.proconnect.repository.ProfessionRepository professionRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.professionRepository = professionRepository;
    }


    public User saveUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("El email ya está en uso");
        }
        
        // Buscar o crear la profesión ingresada por el usuario al registrarse
        if (user.getProfession() != null && user.getProfession().getName() != null && !user.getProfession().getName().trim().isEmpty()) {
            String professionName = user.getProfession().getName().trim();
            com.proconnect.model.Profession mappedProfession = professionRepository.findByNameIgnoreCase(professionName)
                    .orElseGet(() -> {
                        com.proconnect.model.Profession newProf = new com.proconnect.model.Profession();
                        newProf.setName(professionName);
                        newProf.setDescription("Profesión creada dinámicamente al registrar experto.");
                        return professionRepository.save(newProf);
                    });
            user.setProfession(mappedProfession);
        }

        // Encriptar la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getProfessionals() {
        return userRepository.findByRole(Role.PROFESSIONAL);
    }

    public User login(String email, String rawPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Compara la versión encriptada en BD con la versión recibida
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return user; // Login exitoso
            }
        }
        throw new RuntimeException("Credenciales inválidas");
    }
}
