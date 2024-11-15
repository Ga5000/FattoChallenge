package com.api.ga5000.fattochallenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

/**
 * DTO for {@link com.api.ga5000.fattochallenge.model.Task}
 */
public record TaskResponseDto(@NotNull UUID taskId, @NotNull @NotBlank String name, @NotNull Double cost,
                              @NotNull   @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate limitDate, Integer presentationOrder) implements Serializable {
}