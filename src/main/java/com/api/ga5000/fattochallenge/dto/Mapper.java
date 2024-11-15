package com.api.ga5000.fattochallenge.dto;

import com.api.ga5000.fattochallenge.model.Task;

public class Mapper {
    public static TaskResponseDto toTaskResponseDto(Task task) {
        return new TaskResponseDto(
                task.getTaskId(),
                task.getName(),
                task.getCost(),
                task.getLimitDate(),
                task.getPresentationOrder()
        );
    }
}
