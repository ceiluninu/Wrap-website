package com.wrapbrand.security;

import com.wrapbrand.entity.User;
import com.wrapbrand.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        User admin = userRepository.findByEmail("admin@wrapbrand.com").orElse(new User());
        admin.setFirstName("Admin");
        admin.setLastName("User");
        admin.setEmail("admin@wrapbrand.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("ADMIN");
        userRepository.save(admin);
        System.out.println("====== ADMIN USER SEEDED / UPDATED ======");
    }
}
