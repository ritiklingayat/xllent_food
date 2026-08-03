package com.example.xllent_ecommerce.config;

import com.example.xllent_ecommerce.entity.Role;
import com.example.xllent_ecommerce.entity.Status;
import com.example.xllent_ecommerce.entity.User;
import com.example.xllent_ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Creates the first administrator for a new development database. Existing
 * accounts are never changed, including their passwords.
 */
@Component
@RequiredArgsConstructor
public class SuperAdminBootstrap implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.bootstrap.super-admin.enabled}")
    private boolean enabled;

    @Value("${app.bootstrap.super-admin.email}")
    private String email;

    @Value("${app.bootstrap.super-admin.password}")
    private String password;

    @Override
    public void run(ApplicationArguments args) {
        if (!enabled || userRepository.existsByEmail(email)) {
            return;
        }

        User superAdmin = User.builder()
                .firstName("Super")
                .lastName("Admin")
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(Role.SUPER_ADMIN)
                .status(Status.ACTIVE)
                .build();

        userRepository.save(superAdmin);
    }
}
