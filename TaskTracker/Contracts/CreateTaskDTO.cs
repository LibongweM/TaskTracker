using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TaskTracker.Converters;
using TaskTracker.Entities;

public class CreateTaskDTO
{
    [Required(ErrorMessage = "The title of the task is required")]
    public string Title { get; set; }

    [Required(ErrorMessage = "The description of the task is required")]
    public string Description { get; set; }

    [JsonConverter(typeof(IntAsStringEnumConverter<StatusForTask>))]
    public StatusForTask Status { get; set; } = StatusForTask.New;

    [JsonConverter(typeof(IntAsStringEnumConverter<TaskPriority>))]
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