<<<<<<< HEAD
package com.klef.dev.Controller;

import com.klef.dev.Entity.User;
import com.klef.dev.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) { this.userService = userService; }

    // Register USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            if(user.getName() == null || user.getEmail() == null || user.getPassword() == null)
                return ResponseEntity.badRequest().body("Name, Email & Password are required");

            if(user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("USER");
            }

            User newUser = userService.register(user);
            newUser.setPassword(null); // Don't return password
            return ResponseEntity.ok(newUser);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Login USER or ADMIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        try {
            Optional<User> u = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
            if(u.isPresent()) {
                User user = u.get();
                user.setPassword(null); // Hide password
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } catch(Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if(user.isPresent()) {
            User u = user.get();
            u.setPassword(null);
            return ResponseEntity.ok(u);
        } else return ResponseEntity.notFound().build();
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> existing = userService.getUserById(id);
        if(!existing.isPresent()) return ResponseEntity.notFound().build();

        User user = existing.get();
        if(updatedUser.getName() != null) user.setName(updatedUser.getName());
        if(updatedUser.getPhone() != null) user.setPhone(updatedUser.getPhone());
        if(updatedUser.getAddress() != null) user.setAddress(updatedUser.getAddress());
        if(updatedUser.getCity() != null) user.setCity(updatedUser.getCity());
        if(updatedUser.getState() != null) user.setState(updatedUser.getState());
        if(updatedUser.getZipCode() != null) user.setZipCode(updatedUser.getZipCode());
        if(updatedUser.getBio() != null) user.setBio(updatedUser.getBio());
        if(updatedUser.getPetPreference() != null) user.setPetPreference(updatedUser.getPetPreference());
        if(updatedUser.getExperience() != null) user.setExperience(updatedUser.getExperience());

        User savedUser = userService.updateUser(user);
        savedUser.setPassword(null);
        return ResponseEntity.ok(savedUser);
    }

   
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        users.forEach(u -> u.setPassword(null));
        return ResponseEntity.ok(users);
    }

   
    @PostMapping("/create-admin")
    public ResponseEntity<?> createAdmin(@RequestBody User adminUser) {
        try {
            adminUser.setRole("ADMIN");
            User newAdmin = userService.register(adminUser);
            newAdmin.setPassword(null);
            return ResponseEntity.ok(newAdmin);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
=======
>>>>>>> aswini
