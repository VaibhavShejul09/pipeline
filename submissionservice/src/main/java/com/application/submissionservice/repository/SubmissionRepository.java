package com.application.submissionservice.repository;

import com.application.submissionservice.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
}

