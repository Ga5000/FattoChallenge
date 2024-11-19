package com.api.ga5000.fattochallenge.service.interfaces;

import com.api.ga5000.fattochallenge.dto.PaginatedResponseDTO;
import com.api.ga5000.fattochallenge.dto.TaskRequestDto;
import com.api.ga5000.fattochallenge.dto.TaskResponseDto;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;

import java.util.UUID;

public interface ITaskService {
    TaskResponseDto addTask(TaskRequestDto taskRequestDto) throws EntityExistsException;
    TaskResponseDto updateTask(UUID taskId, TaskRequestDto taskRequestDto) throws EntityNotFoundException, EntityExistsException;
    void deleteTask(UUID taskId) throws EntityNotFoundException;
    PaginatedResponseDTO<TaskResponseDto> getAllTasks(int pageNumber, int pageSize);
    void moveTask(UUID taskId, boolean moveUp, int pageNumber, int pageSize);
}
