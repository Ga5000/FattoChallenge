package com.api.ga5000.fattochallenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.api.ga5000.fattochallenge.model.Task}
 */
public record TaskRequestDto(@NotNull @NotEmpty String name,
                             @NotNull @DecimalMin(value = "1.0") Double cost,
                             @NotNull @FutureOrPresent @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
                             LocalDate limitDate) implements Serializable {
}