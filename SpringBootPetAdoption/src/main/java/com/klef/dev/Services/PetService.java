package com.klef.dev.Services;

import com.klef.dev.Entity.Pet;
import com.klef.dev.Repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    // Save pet (used in addPet and updatePet)
    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    // Get all pets
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    // Get pet by ID
    public Optional<Pet> getPetById(Long id) {
        return petRepository.findById(id);
    }

    // Delete pet by ID
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }

    // Get pets by type
    public List<Pet> getPetsByType(String type) {
        return petRepository.findByType(type);
    }

    // Get pets by vaccination status
    public List<Pet> getPetsByVaccinationStatus(boolean vaccinated) {
        return petRepository.findByVaccinated(vaccinated);
    }

    // Get pets by training status
    public List<Pet> getPetsByTrainingStatus(boolean trained) {
        return petRepository.findByTrained(trained);
    }

    // Search pets by name (case-insensitive)
    public List<Pet> searchPets(String keyword) {
        return petRepository.findByNameContainingIgnoreCase(keyword);
    }
}
