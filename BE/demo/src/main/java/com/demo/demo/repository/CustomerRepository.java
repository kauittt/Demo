package com.demo.demo.repository;

import com.demo.demo.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    @Query("SELECT MAX(c.id) FROM Customer c")
    Optional<String> findMaxId();

    @Query("SELECT c FROM Customer c WHERE lower(c.id)LIKE %:keyword% OR lower(c.name) LIKE %:keyword% ")
    List<Customer> findByIdOrNameContaining(@Param("keyword") String keyword);
}
