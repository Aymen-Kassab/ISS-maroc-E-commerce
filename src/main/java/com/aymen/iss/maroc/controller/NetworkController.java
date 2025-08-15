package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Network;
import com.aymen.iss.maroc.service.NetworkService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/network")
@CrossOrigin(origins = "*")
public class NetworkController {

    private final NetworkService networkService;
    private final Cloudinary cloudinary;

    private static final int MAX_FILES = 20;
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    @Autowired
    public NetworkController(NetworkService networkService, Cloudinary cloudinary) {
        this.networkService = networkService;
        this.cloudinary = cloudinary;
    }

    @GetMapping
    public List<Network> getAllNetwork() {
        return networkService.getAllNetwork();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addNetwork(
            @RequestParam("equipmentName") String name,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("equipmentType") String type,
            @RequestParam("description") String description,
            @RequestParam("price") String price,
            @RequestParam("stockQuantity") String stock,
            @RequestParam("equipmentImages") MultipartFile[] images) {

        // Validate file count
        if (images != null && images.length > MAX_FILES) {
            return ResponseEntity.badRequest()
                    .body("Maximum " + MAX_FILES + " images allowed");
        }

        Network net = new Network();
        net.setName(name);
        net.setBrand(brand);
        net.setModel(model);
        net.setType(type);
        net.setDescription(description);
        net.setPrice(price);
        net.setStock(stock);

        // Handle image upload to Cloudinary
        if (images != null && images.length > 0) {
            List<String> savedImageUrls = new ArrayList<>();
            try {
                for (MultipartFile image : images) {
                    if (!image.isEmpty()) {
                        // Validate file size
                        if (image.getSize() > MAX_FILE_SIZE) {
                            return ResponseEntity.badRequest()
                                    .body("File " + image.getOriginalFilename() + " exceeds size limit of 10MB");
                        }

                        // Upload to Cloudinary
                        Map uploadResult = cloudinary.uploader().upload(
                                image.getBytes(),
                                ObjectUtils.asMap("folder", "network")
                        );

                        String imageUrl = uploadResult.get("secure_url").toString();
                        savedImageUrls.add(imageUrl);
                    }
                }
                net.setImageUrls(savedImageUrls);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to upload images: " + e.getMessage());
            }
        }

        try {
            Network savedNetwork = networkService.saveNetwork(net);
            return ResponseEntity.ok(savedNetwork);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save network: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNetwork(@PathVariable Long id) {
        boolean deleted = networkService.deleteNetwork(id);

        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Equipement introuvable");
        }
    }

    @GetMapping("/{id}")
    public Optional<Network> getNetwork(@PathVariable long id) {
        return networkService.getNetworkById(id);
    }
}