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
String uploadDir = "C:\\project\\camp\\src\\main\\resources\\static\\uploaded-images";

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
}
