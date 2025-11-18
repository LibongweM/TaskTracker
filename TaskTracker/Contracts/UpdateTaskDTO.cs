using System.ComponentModel.DataAnnotations;
using TaskTracker.Entities;

public class UpdateTaskDTO
{
    public int Id { get; set; }

    [Required(ErrorMessage = "The title of the task is required")]
    public required string Title { get; set; }

    [Required(ErrorMessage = "The description of the task is required")]
    public required string Description { get; set; }

    public StatusForTask Status { get; set; } = StatusForTask.New;

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public DateTime? DueDate { get; set; }
}