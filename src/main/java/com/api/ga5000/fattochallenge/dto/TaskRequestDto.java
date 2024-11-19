package com.api.ga5000.fattochallenge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.api.ga5000.fattochallenge.model.Task}
 */
public record TaskRequestDto(@NotEmpty(message = "O nome não pode estar vazio") String name,
                              @DecimalMin(value = "1.0", message = "O valor deve ser de pelo menos 1 ou mais") Double cost,
                             @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
                             @FutureOrPresent(message = "A data não pode estar no passado")
                             @NotNull(message = "A data não pode estar vazia")
                             LocalDate limitDate) implements Serializable {
}