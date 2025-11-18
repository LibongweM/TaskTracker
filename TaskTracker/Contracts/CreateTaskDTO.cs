using System.ComponentModel.DataAnnotations;
using TaskTracker.Entities;

public class CreateTaskDTO
{
    [Required(ErrorMessage = "The title of the task is required")]
    public required string Title { get; set; }

    [Required(ErrorMessage = "The description of the task is required")]
    public required string Description { get; set; }

    public StatusForTask Status { get; set; } = StatusForTask.New;

    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    public DateTime? DueDate { get; set; }
}

public static class TaskExtensions
{
    public static Tasks MapToDomain(this CreateTaskDTO dto)
    {
        return new Tasks
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            DueDate = dto.DueDate
        };
    }

    public static Tasks MapToDomain(this UpdateTaskDTO dto)
    {
        return new Tasks
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            DueDate = dto.DueDate,
            Id = dto.Id
        };
    }

    public static TaskDTO MapToDTO(this Tasks task)
    {
        return new TaskDTO
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Status = task.Status,
            Priority = task.Priority,
            DueDate = task.DueDate,
            CreatedAt = task.CreatedAt
        };
    }

    public static List<TaskDTO> MapToDTOList(this List<Tasks> tasks)
    {
        return tasks.Select(t => t.MapToDTO()).ToList();
    }
}