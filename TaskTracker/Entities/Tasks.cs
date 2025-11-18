using System.ComponentModel.DataAnnotations;

namespace TaskTracker.Entities;

public class Tasks
{
    [Key]
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public StatusForTask Status { get; set; } = StatusForTask.New;

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public DateTime? DueDate { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}