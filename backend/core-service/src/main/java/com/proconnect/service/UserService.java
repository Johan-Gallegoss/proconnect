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

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public List<User> findProfessionals() {
        return userRepository.findByRole(Role.PROFESSIONAL);
    }

    public User saveUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("El email ya está en uso");
        }
        // Encriptar la contraseña antes de guardar
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
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
