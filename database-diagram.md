```mermaid
erDiagram
  Church ||--o{ Schedule : "1:N"
  Church ||--o{ RecurringSchedule : "1:N"
  Schedule }o--|| Church : "pertence a"
  RecurringSchedule }o--|| Church : "pertence a"
  Schedule }o--o{ Musician : "N:M"
  RecurringSchedule }o--o{ Musician : "N:M"

  Church {
    string id PK
    string name
    string? description
    string? address
    datetime createdAt
    datetime updatedAt
  }

  Schedule {
    string id PK
    datetime date
    string? description
    string churchId FK
    datetime createdAt
    datetime updatedAt
  }

  RecurringSchedule {
    string id PK
    int dayOfWeek
    Frequency frequency
    string? description
    string churchId FK
    datetime createdAt
    datetime updatedAt
  }

  Musician {
    string id PK
    string name
    string email
    string[] instruments
    datetime createdAt
    datetime updatedAt
  }
```