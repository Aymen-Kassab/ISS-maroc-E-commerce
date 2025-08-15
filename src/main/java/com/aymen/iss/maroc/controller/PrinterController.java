package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Printer;
import com.aymen.iss.maroc.service.PrinterService;
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
@RequestMapping("/api/printer")
@CrossOrigin(origins = "*")
public class PrinterController {

    private final PrinterService printerService;
    private final Cloudinary cloudinary;

    private static final int MAX_FILES = 20;
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    @Autowired
    public PrinterController(PrinterService printerService, Cloudinary cloudinary) {
        this.printerService = printerService;
        this.cloudinary = cloudinary;
    }

    @GetMapping
    public List<Printer> getAllPrinters() {
        return printerService.getAllPrinters();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPrinter(
            @RequestParam("scannerName") String name,
            @RequestParam("brand") String brand,
            @RequestParam("printSpeed") String printSpeed,
            @RequestParam("printResolution") String resolution,
            @RequestParam("type") String type,
            @RequestParam("duplexPrinting") String rectoVerso,
            @RequestParam("price") String price,
            @RequestParam("stockQuantity") String stock,
            @RequestParam("connectivity") List<String> connectivity,
            @RequestParam("scannerImages") MultipartFile[] images
    ) {

        // Validate file count
        if (images != null && images.length > MAX_FILES) {
            return ResponseEntity.badRequest()
                    .body("Maximum " + MAX_FILES + " images allowed");
        }

        Printer printer = new Printer();
        printer.setName(name);
        printer.setBrand(brand);
        printer.setPrintSpeed(printSpeed);
        printer.setResolution(resolution);
        printer.setType(type);
        printer.setRectoVerso(rectoVerso);
        printer.setPrice(price);
        printer.setStock(stock);
        printer.setConnectivity(connectivity);

        // Upload to Cloudinary
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
                                ObjectUtils.asMap("folder", "printers")
                        );

                        String imageUrl = uploadResult.get("secure_url").toString();
                        savedImageUrls.add(imageUrl);
                    }
                }
                printer.setImageUrls(savedImageUrls);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to upload images: " + e.getMessage());
            }
        }

        try {
            Printer savedPrinter = printerService.savePrinter(printer);
            return ResponseEntity.ok(savedPrinter);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save printer: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrinter(@PathVariable Long id) {
        boolean deleted = printerService.deletePrinter(id);

        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imprimante introuvable");
        }
    }

    @GetMapping("/{id}")
    public Optional<Printer> getPrinter(@PathVariable long id) {
        return printerService.getPrinterById(id);
    }
}