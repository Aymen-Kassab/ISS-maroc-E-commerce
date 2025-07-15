package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Computer;
import com.aymen.iss.maroc.service.ComputerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/computers")
@CrossOrigin(origins = "*")
public class ComputerController {

    private final ComputerService computerService;
    private static final String UPLOAD_DIR = "uploads/";
    private static final int MAX_FILES = 20;
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    @Autowired
    public ComputerController(ComputerService computerService) {
        this.computerService = computerService;
    }

    @GetMapping
    public List<Computer> getAllComputers() {
        return computerService.getAllComputers();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addComputer(
            @RequestParam("pcName") String name,
            @RequestParam("brand") String brand,
            @RequestParam("pcType") String type,
            @RequestParam("processor") String processor,
            @RequestParam("ram") String ram,
            @RequestParam("stockage") String stockage,
            @RequestParam("typeStockage") String typeStockage,
            @RequestParam("price") String price,
            @RequestParam("stockQuantity") String stockQuantity,
            @RequestParam("pcImages") MultipartFile[] images) {



        // Validate file count
        final int MAX_FILES = 20;
        if (images != null && images.length > MAX_FILES) {
            return ResponseEntity.badRequest()
                    .body("Maximum " + MAX_FILES + " images allowed");
        }

        Computer comp = new Computer();
        comp.setName(name);
        comp.setBrand(brand);
        comp.setType(type);
        comp.setProcessor(processor);
        comp.setMemory(ram);
        comp.setStorage(stockage);
        comp.setStorageType(typeStockage);
        comp.setPrice(price);
        comp.setStock(stockQuantity);

        if (images != null && images.length > 0) {
            List<String> savedImageUrls = new ArrayList<>();
            Path uploadPath = Paths.get("src/main/resources/static", UPLOAD_DIR).toAbsolutePath().normalize();

            try {
                Files.createDirectories(uploadPath);

                for (MultipartFile image : images) {
                    if (!image.isEmpty()) {
                        // Validate file size
                        if (image.getSize() > MAX_FILE_SIZE) {
                            return ResponseEntity.badRequest()
                                    .body("File " + image.getOriginalFilename() + " exceeds size limit of 10MB");
                        }

                        String fileExtension = image.getOriginalFilename()
                                .substring(image.getOriginalFilename().lastIndexOf("."));
                        String uniqueFilename = UUID.randomUUID() + fileExtension;

                        Path destination = uploadPath.resolve(uniqueFilename);
                        image.transferTo(destination);

                        savedImageUrls.add("/" + UPLOAD_DIR + uniqueFilename);
                    }
                }
                comp.setImageUrls(savedImageUrls);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to save images: " + e.getMessage());
            }
        }

        try {
            Computer savedComputer = computerService.saveComputer(comp);
            return ResponseEntity.ok(savedComputer);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save computer: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComputer(@PathVariable Long id) {
        boolean deleted = computerService.deleteComputer(id);

        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ordinateur introuvable");
        }
    }

    @GetMapping("/{id}")
    public Optional<Computer> getComputer(@PathVariable long id) {
        return computerService.getComputerById(id);
    }
}