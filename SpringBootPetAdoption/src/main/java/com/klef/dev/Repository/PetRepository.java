package com.klef.dev.Repository;

import com.klef.dev.Entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    
    // Find pets by type (dog, cat, rabbit, etc.)
    List<Pet> findByType(String type);
    
    // Find pets by vaccination status
    List<Pet> findByVaccinated(boolean vaccinated);
    
    // Find pets by training status
    List<Pet> findByTrained(boolean trained);
    
    // Search pets by name (case-insensitive)
    List<Pet> findByNameContainingIgnoreCase(String name);
    
    // Find pets by age range
    List<Pet> findByAgeBetween(int minAge, int maxAge);
}
