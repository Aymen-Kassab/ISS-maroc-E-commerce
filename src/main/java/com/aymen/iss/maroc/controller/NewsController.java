package com.aymen.iss.maroc.controller;

import com.aymen.iss.maroc.model.News;
import com.aymen.iss.maroc.repository.NewsRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private Cloudinary cloudinary;

    @PostMapping
    public ResponseEntity<?> uploadNewsImage(@RequestParam("image") MultipartFile file) {
        try {
            // Upload directly to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

            // Cloudinary returns a full public HTTPS URL
            String imageUrl = uploadResult.get("secure_url").toString();

            News news = new News(imageUrl);
            newsRepository.save(news);

            return ResponseEntity.ok(news);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping
    public List<News> getAllNews() {
        List<News> newsList = newsRepository.findAll();
        // Now Cloudinary gives a full HTTPS URL, so no need to modify paths
        return newsList;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        Optional<News> news = newsRepository.findById(id);

        if (news.isPresent()) {
            newsRepository.deleteById(id);
            return ResponseEntity.ok("Deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("News not found!");
        }
    }
}