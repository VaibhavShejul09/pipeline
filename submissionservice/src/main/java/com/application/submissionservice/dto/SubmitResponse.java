package com.application.submissionservice.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmitResponse {

    private Long submissionId;
    private String verdict;     // ACCEPTED, WRONG_ANSWER, etc.
    private Long runtimeMs;  // optional (can be null for now)
    private Integer memoryKb;   // optional (can be null for now)
}
