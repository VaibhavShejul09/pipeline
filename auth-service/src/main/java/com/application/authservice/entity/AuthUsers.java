package com.application.authservice.entity;

import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "auth_users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthUsers {

    @Id
    @GeneratedValue
    private UUID id;

    private String username;
    private String password;
    private String mobile;
    private String role;
    private boolean enabled;
}
