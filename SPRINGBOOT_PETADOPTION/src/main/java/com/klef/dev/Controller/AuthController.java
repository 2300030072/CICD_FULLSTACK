package com.klef.dev.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.Entity.UserEntity;
import com.klef.dev.Services.UserService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow React app to access this controller
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserEntity  user) {
        try {
            // Call service to handle business logic
            UserEntity  savedUser = userService.registerUser(user);
            
            // Create success response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", savedUser);
            
            // Return 201 CREATED with user data
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (RuntimeException e) {
            // Handle business logic errors (email already exists)
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            
            // Return 400 BAD REQUEST with error message
            return ResponseEntity.badRequest().body(error);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        
        Optional<UserEntity> user = userService.loginUser(email, password);
        
        if (user.isPresent()) {
           
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("user", user.get());
    
            return ResponseEntity.ok(response);
            
        } else {
            
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid email or password");
 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
    }
     
}
