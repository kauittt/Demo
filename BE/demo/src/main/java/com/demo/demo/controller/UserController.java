package com.demo.demo.controller;

import com.demo.demo.dto.UserRequestDTO;
import com.demo.demo.entity.JwtAuthResponse;
import com.demo.demo.entity.Response;
import com.demo.demo.entity.User;
import com.demo.demo.security.JWTGenerator;
import com.demo.demo.service.AuthorityService;
import com.demo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final AuthorityService authorityService;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator jwtGenerator;

    @Autowired
    public UserController(AuthorityService authorityService, UserService userService, AuthenticationManager authenticationManager, JWTGenerator jwtGenerator) {
        this.authorityService = authorityService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDTO userRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userRequestDTO.getUsername(), userRequestDTO.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtGenerator.generateToken(authentication);
            return ResponseEntity.ok(new JwtAuthResponse(token));
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRequestDTO userRequestDTO) {
        try {
            User savedUser = userService.createUser(userRequestDTO);
            return ResponseEntity.ok(savedUser);
        } catch (Exception ex) {
            Response response = Response.of(HttpStatus.BAD_REQUEST, ex.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}
