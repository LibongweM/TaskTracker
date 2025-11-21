using TaskTracker.Contracts;
using TaskTracker.Entities;
using TaskTracker.Models;

namespace TaskTracker.Interfaces;

public interface ITaskService
{
    Task<Result<TaskDTO>> GetById(int id);
    Task<Result<List<TaskDTO>>> GetAll(string? searchTerm = null, SortDescriptor sortBy = SortDescriptor.Asc);
    Task<Result<TaskDTO>> Add(Tasks task);
    Task<Result<TaskDTO>> Update(int id, Tasks task);
    Task<Result> DeleteTask(int id);
}