package com.klef.dev.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.Entity.UserEntity;
import com.klef.dev.Services.UserService;

import java.util.Optional;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable Long id) {
        Optional<UserEntity> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok) // 200 OK if found
                  .orElse(ResponseEntity.notFound().build()); // 404 if not found
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserEntity user) {
        UserEntity updatedUser = userService.updateUser(id, user);
        return updatedUser != null ? ResponseEntity.ok(updatedUser) // 200 OK if updated
                                   : ResponseEntity.notFound().build(); // 404 if user not found
    }
    
}
