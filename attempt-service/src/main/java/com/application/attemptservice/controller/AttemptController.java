package com.application.attemptservice.controller;

import com.application.attemptservice.dto.AnswerRequest;
import com.application.attemptservice.dto.StartAttemptRequest;
import com.application.attemptservice.service.AttemptService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

@RestController
@RequestMapping("/api/attempts")
@RequiredArgsConstructor
@Slf4j
public class AttemptController {

    private final AttemptService attemptService;

    @PostMapping("/start")
    public ResponseEntity<?> startAttempt(
            @RequestBody StartAttemptRequest request,
            @RequestHeader("X-User-Id") UUID userId
    ) {
        log.info("Creating attempt for userId={}", userId);

        return ResponseEntity.ok(
                attemptService.startAttempt(request.getQuizId(), userId)
        );
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{attemptId}/answer")
    public ResponseEntity<Void> saveAnswer(
            @PathVariable UUID attemptId,
            @RequestBody AnswerRequest request
    ) {
        attemptService.saveAnswer(attemptId, request);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{attemptId}/submit")
    public ResponseEntity<Void> submitAttempt(
            @PathVariable UUID attemptId,
            @RequestHeader("X-User-Id") UUID userId
    ) {
        attemptService.submitAttempt(attemptId, userId);
        return ResponseEntity.ok().build();
    }
}
