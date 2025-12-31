package com.application.submissionservice.controller;

import com.application.submissionservice.dto.*;
import com.application.submissionservice.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService service;

    public SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @PostMapping("/run")
    public RunResponse run(@RequestBody RunRequest request) {
        return service.run(request);
    }

    @PostMapping("/submit")
    public SubmitResponse submit(@RequestBody SubmitRequest request) {
        return service.submit(request);
    }
}

