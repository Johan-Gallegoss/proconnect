package com.proconnect.service;

import com.proconnect.model.Role;
import com.proconnect.model.User;
import com.proconnect.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        // TODO: La contraseña debe ser encriptada aquí antes de guardar
        return userRepository.save(user);
    }
}
