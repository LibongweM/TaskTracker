using TaskTracker.Entities;

namespace TaskTracker.Data;

public class SeedData
{
    public static void Initialize(TrackerAppDbContext db)
    {
        if (db.Tasks.Any()) return; // Already seeded

        db.Tasks.AddRange(
            new Tasks
            {
                Title = "Design API",
                Description = "Design RESTful API endpoints",
                Status = StatusForTask.New,
                Priority = TaskPriority.High,
                DueDate = DateTime.UtcNow.AddDays(3),
                CreatedAt = DateTime.UtcNow
            },
            new Tasks
            {
                Title = "Implement Backend",
                Description = "Build minimal APIs and EF Core models",
                Status = StatusForTask.InProgress,
                Priority = TaskPriority.High,
                DueDate = DateTime.UtcNow.AddDays(7),
                CreatedAt = DateTime.UtcNow
            },
            new Tasks
            {
                Title = "Create Frontend",
                Description = "React SPA with task list and forms",
                Status = StatusForTask.New,
                Priority = TaskPriority.Medium,
                DueDate = null,
                CreatedAt = DateTime.UtcNow
            }
        );

        db.SaveChanges();
    }
}