package com.application.resultservice.service;

import com.application.resultservice.dto.ResultResponse;

import java.util.List;
import java.util.UUID;

public interface ResultService {

    ResultResponse evaluateAttempt(UUID attemptId);

    ResultResponse getResultByAttempt(UUID attemptId);

    List<ResultResponse> getResultsByUser(UUID userId);
}
