package com.bitc.camp.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class ImageUploadController {

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping("/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("image") MultipartFile imageFile) {
        try {
            if (imageFile.isEmpty()) {
                return ResponseEntity.badRequest().body("Image file is required");
            }

            // 파일 이름 생성
            String fileName = UUID.randomUUID().toString() + "-" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            // 파일 업로드
            File dest = filePath.toFile();
            imageFile.transferTo(dest);

            // 업로드된 이미지 URL 반환
            String imageUrl = "/uploaded-images/" + fileName; // 이 부분은 실제 웹 경로로 수정해야 합니다.

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }
}
