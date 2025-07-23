package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.Printer;
import com.aymen.iss.maroc.service.PrinterService;
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
@RequestMapping("/api/printer")
@CrossOrigin(origins = "*")
public class PrinterController {

    private final PrinterService printerService;
    private static final String UPLOAD_DIR = "/uploads";
    private static final int MAX_FILES = 20;
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; //10MB

    @Autowired
    public PrinterController(PrinterService printerService) {
        this.printerService = printerService;
    }

    @GetMapping
    public List<Printer> getAllPrinters(){
        return printerService.getAllPrinters();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPrinter(
            @RequestParam("scannerName") String name,
            @RequestParam("brand") String brand,
            @RequestParam("printSpeed") String printSpeed,
            @RequestParam("printResolution") String resolution,
            @RequestParam("monthlyDutyCycle") String workCycle,
            @RequestParam("duplexPrinting") String rectoVerso,
            @RequestParam("price") String price,
            @RequestParam("stockQuantity") String stock,
            @RequestParam("connectivity[]") List<String> connectivity,
            @RequestParam("scannerImages[]") MultipartFile[] images
    ){


        //validate file count
        final int MAX_FILES = 20;
        if (images != null && images.length > MAX_FILES) {
            return ResponseEntity.badRequest()
                    .body("Maximum " + MAX_FILES + " images allowed");
        }

        Printer printer = new Printer();
        printer.setName(name);
        printer.setBrand(brand);
        printer.setPrintSpeed(printSpeed);
        printer.setResolution(resolution);
        printer.setWorkCycle(workCycle);
        printer.setRectoVerso(rectoVerso);
        printer.setPrice(price);
        printer.setStock(stock);
        printer.setConnectivity(connectivity);

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
                printer.setImageUrls(savedImageUrls);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to save images: " + e.getMessage());
            }
        }

        try{
            Printer savedPrinter = printerService.savePrinter(printer);
            return ResponseEntity.ok(savedPrinter);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to save computer: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePrinter(@PathVariable Long id){
        boolean deleted = printerService.deletePrinter(id);

        if(deleted){
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imprimante introuvable");
        }
    }

    @GetMapping("/{id}")
    public Optional<Printer> getPrinter(@PathVariable long id){
        return printerService.getPrinterById(id);
    }
}
