package com.klef.dev.Controller;
import com.klef.dev.Entity.*;
import com.klef.dev.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173") // adjust if needed
public class PetController {

    @Autowired
    private PetService petService;

   
    @PostMapping("/addPet")
    public ResponseEntity<?> addPet(@RequestBody Pet pet, @RequestParam String role) {
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body("Access Denied: Only Admins can add pets");
        }
        return ResponseEntity.ok(petService.savePet(pet));
    }

  
    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        return ResponseEntity.ok(petService.getAllPets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petService.getPetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
