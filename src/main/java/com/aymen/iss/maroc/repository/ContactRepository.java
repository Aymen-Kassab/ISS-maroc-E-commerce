package com.aymen.iss.maroc.repository;

import com.aymen.iss.maroc.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
