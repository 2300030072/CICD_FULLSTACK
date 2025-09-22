package com.klef.dev.Services;

import org.springframework.stereotype.Service;
import com.klef.dev.Entity.User;
import com.klef.dev.Repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Registration with email uniqueness check
    public User register(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already registered!");
        }
        return userRepository.save(user);
    }

    // Login validation
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword() != null && u.getPassword().equals(password));
    }

    // Update profile safely
    public User updateProfile(User user) {
        if (user.getId() == null) {
            throw new RuntimeException("User ID is required for update");
        }

        Optional<User> existingUserOpt = userRepository.findById(user.getId());
        if (existingUserOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User existingUser = existingUserOpt.get();

        // Update only non-null fields
        if (user.getName() != null) existingUser.setName(user.getName());
        if (user.getEmail() != null) existingUser.setEmail(user.getEmail());
        if (user.getPassword() != null) existingUser.setPassword(user.getPassword());
        if (user.getPhone() != null) existingUser.setPhone(user.getPhone());
        if (user.getAddress() != null) existingUser.setAddress(user.getAddress());
        if (user.getCity() != null) existingUser.setCity(user.getCity());
        if (user.getState() != null) existingUser.setState(user.getState());
        if (user.getZipCode() != null) existingUser.setZipCode(user.getZipCode());
        if (user.getBio() != null) existingUser.setBio(user.getBio());
        if (user.getPetPreference() != null) existingUser.setPetPreference(user.getPetPreference());
        if (user.getExperience() != null) existingUser.setExperience(user.getExperience());

        return userRepository.save(existingUser);
    }
}
