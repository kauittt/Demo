package com.demo.demo.service;

import com.demo.demo.dto.UserRequestDTO;
import com.demo.demo.entity.Authority;
import com.demo.demo.entity.Response;
import com.demo.demo.entity.User;
import com.demo.demo.repository.AuthorityRepository;
import com.demo.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(AuthorityRepository authorityRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authorityRepository = authorityRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private User findUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(Response.notFound("User", id)));
    }

    @Transactional
    public User createUser(UserRequestDTO userRequestDTO) {
        String hashedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        userRequestDTO.setPassword(hashedPassword);

        User user = new User(userRequestDTO);

        Authority userAuthority = authorityRepository.findById("1")
                .orElseThrow(() -> new RuntimeException(Response.notFound("Authority", "1")));
        user.setAuthorities(Collections.singletonList(userAuthority));
        userAuthority.getUsers().add(user);

        return userRepository.save(user);
    }


}
