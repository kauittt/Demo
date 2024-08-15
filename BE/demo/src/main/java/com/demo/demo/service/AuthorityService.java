package com.demo.demo.service;

import com.demo.demo.entity.Authority;
import com.demo.demo.entity.Response;
import com.demo.demo.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class AuthorityService {
    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthorityService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    private Authority findAuthorityById(String id) {
        return authorityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(Response.notFound("Authority", id)));
    }

    public List<Authority> getAllAuthoritiesByUsername(String username) {
        return authorityRepository.findAuthoritiesByUsername(username);
    }


    public List<Authority> getAllAuthorities() {
        return authorityRepository.findAll();
    }
}
