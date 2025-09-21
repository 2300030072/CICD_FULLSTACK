package com.klef.dev.Services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.Entity.PetEntity;
import com.klef.dev.Repository.PetRepository;

import java.util.List;
import java.util.Optional;


@Service
public class PetService {
    
    @Autowired
    private PetRepository petRepository;
    
   
    public List<PetEntity> getAllPets() {
        return petRepository.findAll();
    }
    
    public List<PetEntity> getAvailablePets() {
        return petRepository.findByAdoptionStatus("AVAILABLE");
    }
    
    public Optional<PetEntity> getPetById(Long id) {
        return petRepository.findById(id);
    }
    public PetEntity savePet(PetEntity pet) {
        return petRepository.save(pet);
    }
    
    public PetEntity updatePet(Long id, PetEntity petDetails) {
        Optional<PetEntity> petOptional = petRepository.findById(id);
        if (petOptional.isPresent()) {
            PetEntity pet = petOptional.get();
            
            // Update all fields that can change
            pet.setName(petDetails.getName());
            pet.setType(petDetails.getType());
            pet.setBreed(petDetails.getBreed());
            pet.setAge(petDetails.getAge());
            pet.setGender(petDetails.getGender());
            pet.setSize(petDetails.getSize());
            pet.setDescription(petDetails.getDescription());
            pet.setLocation(petDetails.getLocation());
            pet.setVaccinated(petDetails.getVaccinated());
            pet.setTrained(petDetails.getTrained());
            pet.setAdoptionStatus(petDetails.getAdoptionStatus());

            if (petDetails.getImage() != null) {
                pet.setImage(petDetails.getImage());
            }
            
            return petRepository.save(pet); 
        }
        return null;
    }
    
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
    
 
    public List<PetEntity> searchPets(String type, String breed, String size, String gender) {
        return petRepository.findAvailablePetsWithFilters(type, breed, size, gender);
    }
    public List<PetEntity> getPetsByType(String type) {
        return petRepository.findByTypeIgnoreCaseAndAdoptionStatus(type, "AVAILABLE");
    }
    public PetEntity updateAdoptionStatus(Long petId, String status) {
        Optional<PetEntity> petOptional = petRepository.findById(petId);
        if (petOptional.isPresent()) {
            PetEntity pet = petOptional.get();
            pet.setAdoptionStatus(status);
            return petRepository.save(pet);
        }
        return null;
    }
}
    
    /*
     * METHODS YOU MIGHT ADD LATER:
     * 
     * public List<Pet> getFeaturedPets() - Homepage featured pets
     * public List<Pet> getRecentlyAdded() - New arrivals
     * public List<Pet> getPetsByLocation(String location) - Location filtering
     * public List<Pet> getPetsByAge(int minAge, int maxAge) - Age range filtering
     * public long getAvailableCount() - Count for dashboard stats
     * public Map<String, Long> getPetStatsByType() - Analytics data
     */
