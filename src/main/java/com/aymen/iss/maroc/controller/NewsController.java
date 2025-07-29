package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.News;
import com.aymen.iss.maroc.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @PostMapping
    public ResponseEntity<?> uploadNewsImage(@RequestParam("image") MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            // Store in a location accessible by the web server
            String uploadDir = "src/main/resources/static/news_pictures/";

            Path path = Paths.get(uploadDir);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            Path filePath = path.resolve(fileName);
            Files.copy(file.getInputStream(), filePath);

            // Return complete URL in the response
            String imageUrl = "http://localhost:8080/news_pictures/" + fileName;
            News news = new News(imageUrl);
            newsRepository.save(news);

            return ResponseEntity.ok(news);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }



    @GetMapping
    public List<News> getAllNews() {
        List<News> newsList = newsRepository.findAll();
        // Transform relative paths to absolute URLs
        newsList.forEach(news -> {
            if (!news.getImageUrl().startsWith("http")) {
                news.setImageUrl("http://localhost:8080/" + news.getImageUrl());
            }
        });
        return newsList;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id){
        Optional<News> news = newsRepository.findById(id);

        if(news.isPresent()){
            newsRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found!");
        }
    }
}
