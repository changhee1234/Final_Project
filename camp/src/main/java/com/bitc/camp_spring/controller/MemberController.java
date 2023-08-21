package com.bitc.camp_spring.controller;

<<<<<<< Updated upstream:camp/src/main/java/com/bitc/camp_spring/controller/MemberController.java
import com.bitc.camp_spring.dto.AddMemberReq;
import com.bitc.camp_spring.repository.MemberRepository;
import com.bitc.camp_spring.service.MemberService;
=======
import com.bitc.camp.dto.AddMemberReq;
import com.bitc.camp.dto.ModifyMemberReq;
import com.bitc.camp.entity.Member;
import com.bitc.camp.repository.MemberRepository;
import com.bitc.camp.service.MemberService;
>>>>>>> Stashed changes:camp/src/main/java/com/bitc/camp/controller/MemberController.java
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    // MemberController.java

    @PostMapping("/modify")
    public ResponseEntity<?> modifyMember(@RequestBody ModifyMemberReq modify) {
        try {
            Member member = memberRepository.findByEmail(modify.getEmail())
                    .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

            // 업데이트할 정보 설정
            member.setNickName(modify.getNickName());
            member.setRealName(modify.getRealName());
            member.setPhone(modify.getPhone());

            // 여기에 필요한 정보들을 업데이트하는 로직 추가

            memberRepository.save(member);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 업데이트 오류가 발생했습니다.");
        }
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
