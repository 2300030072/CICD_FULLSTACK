package com.klef.dev.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.dev.Entity.PetEntity;
import com.klef.dev.Services.PetService;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:3000")
public class PetController {
    
    @Autowired
    private PetService petService;
    
    @GetMapping
    public ResponseEntity<List<PetEntity>> getAllPets() {
        List<PetEntity> pets = petService.getAllPets();
        return ResponseEntity.ok(pets); 
    }
    
    
    @GetMapping("/available")
    public ResponseEntity<List<PetEntity>> getAvailablePets() {
        List<PetEntity> pets = petService.getAvailablePets();
        return ResponseEntity.ok(pets);
    }
    
    
    @GetMapping("/{id}")
    public ResponseEntity<PetEntity> getPetById(@PathVariable Long id) {
        Optional<PetEntity> pet = petService.getPetById(id);
        return pet.map(ResponseEntity::ok) // 200 OK if found
                  .orElse(ResponseEntity.notFound().build()); // 404 if not found
    }
    
    
    @PostMapping
    public ResponseEntity<PetEntity> createPet(@Valid @RequestBody PetEntity pet) {
        PetEntity savedPet = petService.savePet(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet); // 201 CREATED
    }
    
    
    @PutMapping("/{id}")
    public ResponseEntity<PetEntity> updatePet(@PathVariable Long id, @Valid @RequestBody PetEntity pet) {
        PetEntity updatedPet = petService.updatePet(id, pet);
        return updatedPet != null ? ResponseEntity.ok(updatedPet) 
                                  : ResponseEntity.notFound().build(); 
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.noContent().build(); 
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<PetEntity>> searchPets(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String size,
            @RequestParam(required = false) String gender) {
        
        List<PetEntity> pets = petService.searchPets(type, breed, size, gender);
        return ResponseEntity.ok(pets);
    }
    @GetMapping("/type/{type}")
    public ResponseEntity<List<PetEntity>> getPetsByType(@PathVariable String type) {
        List<PetEntity> pets = petService.getPetsByType(type);
        return ResponseEntity.ok(pets);
    }
    
    
}
