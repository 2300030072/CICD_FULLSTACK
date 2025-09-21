package com.klef.dev.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;
@Entity
@Table(name = "pets")
public class PetEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @NotBlank(message = "Pet name is required")
    @Column(nullable = false)
    private String name;
    
    @NotBlank(message = "Type is required")
    @Column(nullable = false)
    private String type; 
    @NotBlank(message = "Breed is required")
    private String breed;
    
    @NotNull(message = "Age is required")
    @Positive(message = "Age must be positive")
    private Integer age;
    
    @NotBlank(message = "Gender is required")
    private String gender; 
    
    @NotBlank(message = "Size is required")
    private String size; 
    

    @Column(length = 1000) 
    private String description;
    
    @Column(name = "image_url")
    private String image; 
    private String location; 
    @Column(name = "vaccinated")
    private Boolean vaccinated = false;
    
    @Column(name = "trained")
    private Boolean trained = false;

    @Column(name = "adoption_status")
    private String adoptionStatus = "AVAILABLE"; 
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    // TIMESTAMPS
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // CONSTRUCTORS
    public PetEntity() {}
    
    public PetEntity(String name, String type, String breed, Integer age, String gender, String size) {
        this.name = name;
        this.type = type;
        this.breed = breed;
        this.age = age;
        this.gender = gender;
        this.size = size;
    }
   
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public Boolean getVaccinated() { return vaccinated; }
    public void setVaccinated(Boolean vaccinated) { this.vaccinated = vaccinated; }
    
    public Boolean getTrained() { return trained; }
    public void setTrained(Boolean trained) { this.trained = trained; }
    
    public String getAdoptionStatus() { return adoptionStatus; }
    public void setAdoptionStatus(String adoptionStatus) { this.adoptionStatus = adoptionStatus; }
    
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}