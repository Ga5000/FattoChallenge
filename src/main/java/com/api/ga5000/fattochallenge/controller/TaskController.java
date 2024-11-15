package com.api.ga5000.fattochallenge.controller;

import com.api.ga5000.fattochallenge.dto.PaginatedResponseDTO;
import com.api.ga5000.fattochallenge.dto.TaskRequestDto;
import com.api.ga5000.fattochallenge.dto.TaskResponseDto;
import com.api.ga5000.fattochallenge.model.Task;
import com.api.ga5000.fattochallenge.service.TaskService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;


    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping("/add")
    public ResponseEntity<TaskResponseDto> addTask(@RequestBody @Valid TaskRequestDto taskRequestDto) {
        return ResponseEntity.ok(taskService.addTask(taskRequestDto));
    }

    @PutMapping("/update")
    public ResponseEntity<TaskResponseDto> updateTask(@RequestParam UUID taskId,
                                                      @RequestBody @Valid TaskRequestDto taskRequestDto) {
        try{
            return ResponseEntity.ok(taskService.updateTask(taskId,taskRequestDto));
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteTask(@RequestParam UUID taskId) {
        try{
            taskService.deleteTask(taskId);
            return ResponseEntity.noContent().build();
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<TaskResponseDto>> getAllTasks(@RequestParam int pageNumber,
                                                                             @RequestParam int pageSize) {

        PaginatedResponseDTO<TaskResponseDto> taskPage = taskService.getAllTasks(pageNumber, pageSize);
        return ResponseEntity.ok(taskPage);
    }

    @PostMapping("/move")
    public ResponseEntity<Void> moveTask(@RequestParam UUID taskId, @RequestParam boolean moveUp){
        try{
            taskService.moveTask(taskId,moveUp);
            return ResponseEntity.ok().build();
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
}
