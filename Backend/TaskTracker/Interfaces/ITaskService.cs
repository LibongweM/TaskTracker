using TaskTracker.Contracts;
using TaskTracker.Entities;
using TaskTracker.Models;

namespace TaskTracker.Interfaces;

public interface ITaskService
{
    Task<Result<TaskDTO>> GetById(int id);
    Task<Result<List<TaskDTO>>> GetAll(string? searchTerm = null, SortDescriptor sortBy = SortDescriptor.Asc);
    Task<Result<TaskDTO>> Add(CreateTaskDTO dto);
    Task<Result<TaskDTO>> Update(int id, UpdateTaskDTO dto);
    Task<Result> DeleteTask(int id);
}