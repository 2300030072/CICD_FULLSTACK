package com.klef.dev.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.Entity.UserEntity;
import com.klef.dev.Repository.UserRepository;

import java.util.Optional;


@Service 
public class UserService {
    
    @Autowired 
    private UserRepository userRepository;
    
    
    public UserEntity registerUser(UserEntity user) {
    
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
     
        return userRepository.save(user);
    }
    
    public Optional<UserEntity> loginUser(String email, String password) {
        Optional<UserEntity> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }
        return Optional.empty(); 
    }
    
    public Optional<UserEntity> getUserById(Long id) {
        return userRepository.findById(id);
    }
   
    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public UserEntity  updateUser(Long id, UserEntity userDetails) {
        Optional<UserEntity> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setName(userDetails.getName());
            user.setPhone(userDetails.getPhone());
            user.setAddress(userDetails.getAddress());
            user.setCity(userDetails.getCity());
            user.setState(userDetails.getState());
            user.setZipCode(userDetails.getZipCode());
            user.setBio(userDetails.getBio());
            user.setPetPreference(userDetails.getPetPreference());
            user.setExperience(userDetails.getExperience());
         
            return userRepository.save(user);
        }
        return null; 
    }
    
    /*
     * ADDITIONAL METHODS YOU MIGHT ADD LATER:
     * 
     * public void deleteUser(Long id) - Account deletion
     * public User changePassword(Long id, String oldPassword, String newPassword)
     * public List<User> searchUsers(String query) - Admin functionality
     * public boolean isEmailAvailable(String email) - Real-time validation
     */
}