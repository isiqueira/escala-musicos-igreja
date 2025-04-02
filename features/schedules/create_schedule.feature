# language: pt
Funcionalidade: Criação de escala
  Como líder de louvor
  Eu quero criar escalas de músicos
  Para organizar os cultos semanais

  Cenário: Criar uma escala válida
    Dado que existe a igreja "Igreja Central"
    E existem os músicos "João (Violão)", "Maria (Voz)"
    Quando eu crio uma escala para "25/12/2023" com esses músicos
    Então a escala deve ser registrada no sistema
    E os músicos devem receber notificação