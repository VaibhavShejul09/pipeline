package com.application.submissionservice.service;

import com.application.submissionservice.client.ProblemServiceClient;
import com.application.submissionservice.dto.*;
import com.application.submissionservice.entity.*;
import com.application.submissionservice.judge.Judge0Client;
import com.application.submissionservice.repository.SubmissionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Slf4j
@Service
public class SubmissionService {

    private static final int JAVA_17_LANGUAGE_ID = 62;
    private static final int STATUS_ACCEPTED = 3;

    private final SubmissionRepository repository;
    private final ProblemServiceClient problemClient;
    private final Judge0Client judge0Client;

    public SubmissionService(SubmissionRepository repository,
                             ProblemServiceClient problemClient,
                             Judge0Client judge0Client) {
        this.repository = repository;
        this.problemClient = problemClient;
        this.judge0Client = judge0Client;
    }

    // ================= RUN =================
    public RunResponse run(RunRequest request) {

        validateSourceCode(request.getSourceCode());

        RunResponse response = new RunResponse();

        List<SampleTestCaseDTO> testCases =
                problemClient.getSampleTestCases(request.getProblemId());

        log.info("test cases from problem service ---- "+testCases);

        for (SampleTestCaseDTO tc : testCases) {

            Map<String, Object> raw =
                    judge0Client.submit(request.getSourceCode(), tc.input(), JAVA_17_LANGUAGE_ID);


            log.info("judge0 response  ---- "+raw);


            Judge0Result result = parseJudge0Result(raw);

            String actual = extractOutput(result);

            boolean passed =
                    result.status() != null &&
                            ((Integer) result.status().get("id")) == STATUS_ACCEPTED &&
                            tc.expectedOutput() != null &&
                            tc.expectedOutput().trim().equals(actual.trim());

            response.addResult(
                    tc.input(),
                    tc.expectedOutput(),
                    actual,
                    passed
            );
        }

        return response;
    }

    // ================= SUBMIT =================
    public SubmitResponse submit(SubmitRequest request) {

        validateSourceCode(request.getSourceCode());

        Submission submission = repository.save(
                Submission.builder()
                        .userId(request.getUserId())
                        .problemId(request.getProblemId())
                        .languageKey(request.getLanguageKey())
                        .sourceCode(request.getSourceCode())
                        .status(SubmissionStatus.PENDING)
                        .build()
        );

        List<JudgeTestCaseDTO> testCases =
                problemClient.getAllTestCases(request.getProblemId());

        for (JudgeTestCaseDTO tc : testCases) {

            Map<String, Object> raw =
                    judge0Client.submit(request.getSourceCode(), tc.input(), JAVA_17_LANGUAGE_ID);

            Judge0Result result = parseJudge0Result(raw);
            String actual = extractOutput(result);

            boolean passed =
                    result.status() != null &&
                            ((Integer) result.status().get("id")) == STATUS_ACCEPTED &&
                            tc.expectedOutput() != null &&
                            tc.expectedOutput().trim().equals(actual.trim());

            if (!passed) {
                submission.setStatus(SubmissionStatus.WRONG_ANSWER);
                repository.save(submission);

                return SubmitResponse.builder()
                        .submissionId(submission.getId())
                        .verdict("WRONG_ANSWER")
                        .runtimeMs(parseTime(result.time()))
                        .memoryKb(result.memory())
                        .build();
            }
        }

        submission.setStatus(SubmissionStatus.ACCEPTED);
        repository.save(submission);

        return SubmitResponse.builder()
                .submissionId(submission.getId())
                .verdict("ACCEPTED")
                .runtimeMs(null)   // could aggregate max runtime
                .memoryKb(null)
                .build();
    }

    // ================= Helpers =================

    private void validateSourceCode(String sourceCode) {
        if (sourceCode == null || sourceCode.isBlank()) {
            throw new RuntimeException("Source code is missing");
        }
    }

    private Judge0Result parseJudge0Result(Map<String, Object> raw) {
        return new Judge0Result(
                (String) raw.get("stdout"),
                (String) raw.get("stderr"),
                (String) raw.get("compile_output"),
                (String) raw.get("time"),
                (Integer) raw.get("memory"),
                (Map<String, Object>) raw.get("status")
        );
    }

    private String extractOutput(Judge0Result result) {
        if (result.stdout() != null && !result.stdout().isBlank()) {
            return result.stdout().trim();
        }
        if (result.compile_output() != null && !result.compile_output().isBlank()) {
            return result.compile_output().trim();
        }
        if (result.stderr() != null && !result.stderr().isBlank()) {
            return result.stderr().trim();
        }
        return "";
    }

    private Long parseTime(String time) {
        if (time == null) return null;
        return (long) (Double.parseDouble(time) * 1000);
    }
}
