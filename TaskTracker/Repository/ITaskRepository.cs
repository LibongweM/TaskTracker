using TaskTracker.Entities;

namespace TaskTracker.Repository;

public interface ITaskRepository
{
    Task<Tasks> GetTaskById(int id);
    Task<List<Tasks>> GetTasks(string? searchTerm = null, SortDescriptor sortBy = SortDescriptor.Asc);
    Task<Tasks> AddTask(Tasks task);
    Task<Tasks> UpdateTask(int id, Tasks task);
    Task DeleteTask(int id);
}