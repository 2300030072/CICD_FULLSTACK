package com.klef.dev.Services;


import org.springframework.stereotype.Service;

import com.klef.dev.Entity.Pet;
import com.klef.dev.Repository.PetRepository;

import java.util.List;

@Service
public class PetService {
    private final PetRepository petRepository;
    public PetService(PetRepository petRepository) { this.petRepository = petRepository; }

    public List<Pet> getAllPets() { return petRepository.findAll(); }

    public List<Pet> getPetsByType(String type) { return petRepository.findByType(type); }
}

