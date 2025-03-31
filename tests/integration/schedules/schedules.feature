# tests/features/schedules.feature
Feature: Gerenciamento de Escalas
  Scenario: Criar uma escala
    Given um evento existe
    And um músico existe
    When eu crio uma escala para o músico no evento
    Then a escala deve ser salva no banco de dados