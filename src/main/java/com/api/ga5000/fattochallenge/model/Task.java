package com.api.ga5000.fattochallenge.model;

import com.api.ga5000.fattochallenge.dto.TaskRequestDto;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tarefas")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID taskId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double cost;

    @Column(nullable = false)
    private LocalDate limitDate;

    @Column(nullable = false)
    private Integer presentationOrder;

    public Task() {}

    public Task(UUID taskId, String name, Double cost, LocalDate limitDate, Integer presentationOrder) {
        this.taskId = taskId;
        this.name = name;
        this.cost = cost;
        this.limitDate = limitDate;
        this.presentationOrder = presentationOrder;
    }

    public UUID getTaskId() {
        return taskId;
    }

    public void setTaskId(UUID taskId) {
        this.taskId = taskId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public LocalDate getLimitDate() {
        return limitDate;
    }

    public void setLimitDate(LocalDate limitDate) {
        this.limitDate = limitDate;
    }

    public Integer getPresentationOrder() {
        return presentationOrder;
    }

    public void setPresentationOrder(Integer presentationOrder) {
        this.presentationOrder = presentationOrder;
    }

    public void updateFromDto(TaskRequestDto dto) {
        this.name = dto.name();
        this.cost = dto.cost();
        this.limitDate = dto.limitDate();
    }

}
