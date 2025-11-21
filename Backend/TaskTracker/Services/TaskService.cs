using TaskTracker.Contracts;
using TaskTracker.Entities;
using TaskTracker.Interfaces;
using TaskTracker.Models;

namespace TaskTracker.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repo;

    public TaskService(ITaskRepository repo)
    {
        _repo = repo;
    }

    public async Task<Result<TaskDTO>> GetById(int id)
    {
        try
        {
            var task = await _repo.GetTaskById(id);
            return Result<TaskDTO>.Success(task.MapToDTO());
        }
        catch (NotFoundException e)
        {
            return Result<TaskDTO>.Failure(e.Message);
        }
    }

    public async Task<Result<List<TaskDTO>>> GetAll(string? searchTerm = null, SortDescriptor sortBy = SortDescriptor.Asc)
    {
        var tasks = await _repo.GetTasks(searchTerm, sortBy);
        return Result<List<TaskDTO>>.Success(tasks.MapToDTOList());
    }

    public async Task<Result<TaskDTO>> Add(CreateTaskDTO dto)
    {
        try
        {
            var createdTask = await _repo.AddTask(dto.MapToDomain());
            return Result<TaskDTO>.Success(createdTask.MapToDTO());
        }
        catch (Exception e)
        {
            return Result<TaskDTO>.Failure(e.Message);
        }
    }

    public async Task<Result<TaskDTO>> Update(int id, UpdateTaskDTO dto)
    {
        try
        {
            var updatedTask = await _repo.UpdateTask(id, dto.MapToDomain());
            return Result<TaskDTO>.Success(updatedTask.MapToDTO());
        }
        catch (Exception e)
        {
            return Result<TaskDTO>.Failure(e.Message);
        }
    }

    public async Task<Result> DeleteTask(int id)
    {
        try
        {
            await _repo.DeleteTask(id);
            return Result.Success();
        }
        catch (Exception e)
        {
            return Result.Failure(e.Message);
        }
    }
}