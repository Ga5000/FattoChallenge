package com.api.ga5000.fattochallenge.repository;

import com.api.ga5000.fattochallenge.model.Task;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    Page<Task> findAllByOrderByPresentationOrderAsc(Pageable pageable);

    @Query("SELECT MAX(t.presentationOrder) FROM Task t")
    Integer findMaxPresentationOrder();

    List<Task> findByPresentationOrderGreaterThan(Integer presentationOrder);

    Optional<Task> findByPresentationOrder(Integer presentationOrder);

    Optional<Task> findByName(String name);

}
