package com.bitc.camp.controller;

import com.bitc.camp.service.MemberService;
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
import com.bitc.camp.entity.Member;
@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class ImageUploadController {

//    @Value("${upload.dir}")
//    private String uploadDir;
// 프로젝트 이미지 업로드폴더 절대 경로 각각 지정
//String uploadDir = "C:\\project\\camp\\src\\main\\resources\\static\\uploaded-images";
//String uploadDir = "C:\\smart505\\final\\camp\\src\\main\\resources\\static\\uploaded-images";
String uploadDir = "C:\\Camping-Sightseeing\\camp\\src\\main\\resources\\static\\uploaded-images";
//String uploadDir = "C:\\project\\camp\\src\\main\\resources\\static\\uploaded-images"; // 김창희

    private final MemberService memberService;

    public ImageUploadController(MemberService memberService) {
        this.memberService = memberService;
    }

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
//            String imageUrl = uploadDir + "/" + fileName;
            String imageUrl = "/uploaded-images/" + fileName;
            // 회원 정보 변경 서비스 호출
            memberService.updateProfileImage(imageUrl);
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("file") MultipartFile imageFile) {
        try {
            if (imageFile.isEmpty()) {
                return ResponseEntity.badRequest().body(new ImageUploadResponse("Image file is required", null));
            }

            // 파일 이름 생성
            String fileName = UUID.randomUUID().toString() + "-" + imageFile.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            // 파일 업로드
            File dest = filePath.toFile();
            imageFile.transferTo(dest);

            // 업로드된 이미지 URL 반환
            String imageUrl = "/uploaded-images/" + fileName;

            return ResponseEntity.ok(new ImageUploadResponse(null, imageUrl));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ImageUploadResponse("Image upload failed", null));
        }
    }

    public static class ImageUploadResponse {
        private String error;
        private String imageUrl;

        public ImageUploadResponse(String error, String imageUrl) {
            this.error = error;
            this.imageUrl = imageUrl;
        }

        public String getError() {
            return error;
        }

        public String getImageUrl() {
            return imageUrl;
        }
    }

}
