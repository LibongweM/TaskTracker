using TaskTracker.Entities;

public class TaskDTO
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public StatusForTask Status { get; set; }

    public TaskPriority Priority { get; set; }

    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; set; }
}