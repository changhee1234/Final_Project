package com.bitc.camp.controller;

import com.bitc.camp.dto.AddMemberReq;
import com.bitc.camp.repository.MemberRepository;
import com.bitc.camp.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    // 회원가입 프로세스. 완료 후 로그인페이지로 이동

    @PostMapping("/member")
    public Object signup(AddMemberReq member) throws Exception {
        memberService.join(member);
        return null;
    }

    @PostMapping("/login")
    public String login() {
        return "redirect:http://localhost:3000/"; // 로그인 성공 시 리디렉트할 경로
    }

    @GetMapping("/signup")
    public String signup() throws Exception {
        return "signup";
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        // 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // 로그아웃 처리 후 클라이언트에 응답
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-email")
    public ResponseEntity<EmailAvailabilityResponse> checkEmailAvailability(@RequestParam String email) {
        boolean isAvailable = memberRepository.existsByEmail(email);
        return ResponseEntity.ok(new EmailAvailabilityResponse(!isAvailable));
    }

    class EmailAvailabilityResponse {
        private boolean available;

        public EmailAvailabilityResponse(boolean available) {
            this.available = available;
        }

        public boolean isAvailable() {
            return available;
        }
    }
}
