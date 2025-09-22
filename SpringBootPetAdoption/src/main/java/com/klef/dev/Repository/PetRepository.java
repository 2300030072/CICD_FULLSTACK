package com.klef.dev.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.dev.Entity.Pet;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByType(String type);
}

