package com.demo.demo.repository;

import com.demo.demo.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, String> {
    @Query(value = "SELECT A.* FROM users_authorities UA " +
            "JOIN authorities A ON UA.authorityId = A.id " +
            "JOIN users U ON U.id = UA.userId " +
            "WHERE U.username = :username", nativeQuery = true)
    List<Authority> findAuthoritiesByUsername(@Param("username") String username);
}
