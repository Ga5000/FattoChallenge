package com.api.ga5000.fattochallenge.service;

import com.api.ga5000.fattochallenge.dto.Mapper;
import com.api.ga5000.fattochallenge.dto.PaginatedResponseDTO;
import com.api.ga5000.fattochallenge.dto.TaskRequestDto;
import com.api.ga5000.fattochallenge.dto.TaskResponseDto;
import com.api.ga5000.fattochallenge.model.Task;
import com.api.ga5000.fattochallenge.repository.TaskRepository;
import com.api.ga5000.fattochallenge.service.interfaces.ITaskService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class TaskService implements ITaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional
    @Override
    public TaskResponseDto addTask(TaskRequestDto taskRequestDto) throws EntityExistsException{
        taskRepository.findByName(taskRequestDto.name())
                .ifPresent(task -> {throw new EntityExistsException("Uma tarefa com este nome já existe");});

        var task = new Task();
        Integer maxOrder = taskRepository.findMaxPresentationOrder();
        Integer newOrder = (maxOrder == null) ? 1 : maxOrder + 1;

        task.updateFromDto(taskRequestDto);
        task.setPresentationOrder(newOrder);

        taskRepository.save(task);

        return Mapper.toTaskResponseDto(task);
    }

    @Transactional
    @Override
    public TaskResponseDto updateTask(UUID taskId, TaskRequestDto taskRequestDto)
            throws EntityNotFoundException, EntityExistsException{
        Task taskToUpdate = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));

        if (!taskToUpdate.getName().equals(taskRequestDto.name())) {
            taskRepository.findByName(taskRequestDto.name())
                    .ifPresent(task -> {
                        throw new EntityExistsException("Uma Tarefa com este nome já existe");
                    });
        }


        taskToUpdate.updateFromDto(taskRequestDto);
        taskRepository.save(taskToUpdate);

        return Mapper.toTaskResponseDto(taskToUpdate);
    }

    @Transactional
    @Override
    public void deleteTask(UUID taskId) throws EntityNotFoundException {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));

        Integer deletedTaskPresentationOrder = task.getPresentationOrder();
        taskRepository.delete(task);

        updatePresentationOrder(deletedTaskPresentationOrder);
    }

    @Override
    public PaginatedResponseDTO<TaskResponseDto> getAllTasks(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Task> taskPage = taskRepository.findAllByOrderByPresentationOrderAsc(pageable);

        Page<TaskResponseDto> taskResponseDtoPage = taskPage.map(Mapper::toTaskResponseDto);

        return new PaginatedResponseDTO<>(
                taskResponseDtoPage.getContent(),
                taskResponseDtoPage.getTotalPages(),
                taskResponseDtoPage.getTotalElements(),
                taskResponseDtoPage.getNumber()
        );
    }

    @Transactional
    @Override
    public void moveTask(UUID taskId, boolean moveUp, int pageNumber, int pageSize) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));

        Integer currentOrder = task.getPresentationOrder();

        if (moveUp) {
            if (currentOrder == 1 && pageNumber == 0) return;

            if(currentOrder == 1){
                Page<Task> previousPage = taskRepository.findAllByOrderByPresentationOrderAsc
                        (PageRequest.of(pageNumber - 1, pageSize,
                                Sort.by("presentationOrder").ascending()));
                if (previousPage.isEmpty()) return;
                Task lastTaskOnPrevPage = previousPage.getContent().get(previousPage.getContent().size() - 1);
                swapOrders(task, lastTaskOnPrevPage);
            }else {
                Task taskAbove = taskRepository.findByPresentationOrder(currentOrder - 1)
                        .orElseThrow(() -> new EntityNotFoundException("Tarefa acima não encontrada"));
                swapOrders(task, taskAbove);
            }
        } else {
            Page<Task> currentPage = taskRepository.findAllByOrderByPresentationOrderAsc(
                    PageRequest.of(pageNumber, pageSize,
                            Sort.by("presentationOrder").ascending()));
            int totalPages = currentPage.getTotalPages();

            if (currentOrder == currentPage.getContent().size() && pageNumber < totalPages - 1) {
                Page<Task> nextPage = taskRepository.findAllByOrderByPresentationOrderAsc(
                        PageRequest.of(pageNumber + 1, pageSize,
                                Sort.by("presentationOrder").ascending()));
                if (nextPage.isEmpty()) return;

                Task firstTaskOnNextPage = nextPage.getContent().get(0);
                swapOrders(task, firstTaskOnNextPage);
            } else {
                Task taskBelow = taskRepository.findByPresentationOrder(currentOrder + 1)
                        .orElse(null);
                if (taskBelow == null && !(pageNumber == 0 && currentOrder == 1)) return;
                if (taskBelow == null) {
                    Page<Task> nextPage = taskRepository.findAllByOrderByPresentationOrderAsc(
                            PageRequest.of(pageNumber + 1, pageSize,
                                    Sort.by("presentationOrder").ascending()));
                    if (nextPage.isEmpty()) return;

                    Task firstTaskOnNextPage = nextPage.getContent().get(0);
                    swapOrders(task, firstTaskOnNextPage);
                } else {
                    swapOrders(task, taskBelow);
                }
            }
        }
    }

    private void swapOrders(Task task1, Task task2) {
        Integer tempOrder = task1.getPresentationOrder();
        task1.setPresentationOrder(task2.getPresentationOrder());
        task2.setPresentationOrder(tempOrder);

        taskRepository.save(task1);
        taskRepository.save(task2);
    }



    private void updatePresentationOrder(Integer presentationOrder) {
        List<Task> tasksToUpdate = taskRepository.findByPresentationOrderGreaterThan(presentationOrder);

        for (Task t : tasksToUpdate) {
            t.setPresentationOrder(t.getPresentationOrder() - 1);
        }

        taskRepository.saveAll(tasksToUpdate);
    }
}
