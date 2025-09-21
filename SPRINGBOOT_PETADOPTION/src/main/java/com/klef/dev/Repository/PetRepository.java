package com.klef.dev.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.klef.dev.Entity.PetEntity;

import java.util.List;


@Repository
public interface PetRepository extends JpaRepository<PetEntity, Long> {
    
    List<PetEntity> findByAdoptionStatus(String adoptionStatus);
    List<PetEntity> findByTypeIgnoreCase(String type);
    List<PetEntity> findByTypeIgnoreCaseAndAdoptionStatus(String type, String adoptionStatus);
    
    @Query("SELECT p FROM PetEntity p WHERE p.adoptionStatus = 'AVAILABLE' AND " +
    	       "(:type IS NULL OR LOWER(p.type) = LOWER(:type)) AND " +
    	       "(:breed IS NULL OR LOWER(p.breed) LIKE LOWER(CONCAT('%', :breed, '%'))) AND " +
    	       "(:size IS NULL OR LOWER(p.size) = LOWER(:size)) AND " +
    	       "(:gender IS NULL OR LOWER(p.gender) = LOWER(:gender))")
    	List<PetEntity> findAvailablePetsWithFilters(@Param("type") String type,
    	                                             @Param("breed") String breed,
    	                                             @Param("size") String size,
    	                                             @Param("gender") String gender);

    
}
