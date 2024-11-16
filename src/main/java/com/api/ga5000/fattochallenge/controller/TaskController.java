package com.api.ga5000.fattochallenge.controller;

import com.api.ga5000.fattochallenge.dto.PaginatedResponseDTO;
import com.api.ga5000.fattochallenge.dto.TaskRequestDto;
import com.api.ga5000.fattochallenge.dto.TaskResponseDto;
import com.api.ga5000.fattochallenge.model.Task;
import com.api.ga5000.fattochallenge.service.TaskService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<Object> addTask(@RequestBody @Valid TaskRequestDto taskRequestDto) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(taskService.addTask(taskRequestDto));
        }catch (EntityExistsException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateTask(@RequestParam UUID taskId,
                                                      @RequestBody @Valid TaskRequestDto taskRequestDto) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(taskService.updateTask(taskId,taskRequestDto));
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (EntityExistsException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteTask(@RequestParam UUID taskId) {
        try{
            taskService.deleteTask(taskId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Tarefa deletada com sucesso");
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<PaginatedResponseDTO<TaskResponseDto>> getAllTasks(@RequestParam int pageNumber,
                                                                             @RequestParam int pageSize) {

        PaginatedResponseDTO<TaskResponseDto> taskPage = taskService.getAllTasks(pageNumber, pageSize);
        return ResponseEntity.status(HttpStatus.OK).body(taskPage);
    }

    @PostMapping("/move")
    public ResponseEntity<Object> moveTask(@RequestParam UUID taskId, @RequestParam boolean moveUp){
        try{
            taskService.moveTask(taskId,moveUp);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
