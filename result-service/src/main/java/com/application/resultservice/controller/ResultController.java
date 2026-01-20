package com.application.resultservice.controller;

import com.application.resultservice.dto.ResultResponse;
import com.application.resultservice.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/evaluate/{attemptId}")
    public ResponseEntity<ResultResponse> evaluate(
            @PathVariable UUID attemptId
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(resultService.evaluateAttempt(attemptId));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/{attemptId}")
    public ResponseEntity<ResultResponse> getResult(
            @PathVariable UUID attemptId
    ) {
        return ResponseEntity.ok(resultService.getResultByAttempt(attemptId));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ResultResponse>> getUserResults(
            @PathVariable UUID userId
    ) {
        return ResponseEntity.ok(resultService.getResultsByUser(userId));
    }
}
