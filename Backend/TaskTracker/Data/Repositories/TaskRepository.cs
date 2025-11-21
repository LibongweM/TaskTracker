using Microsoft.EntityFrameworkCore;
using TaskTracker.Entities;
using TaskTracker.Interfaces;

namespace TaskTracker.Data.Repositories;

public class TaskRepository(TrackerAppDbContext dbContext) : ITaskRepository
{
    public async Task<Tasks> GetTaskById(int id)
    {
        var task = await dbContext.Tasks.FindAsync(id) ??
            throw new NotFoundException($"Task, {id}, could not be found");

        return task;
    }

    public async Task<List<Tasks>> GetTasks(string? searchTerm = null, SortDescriptor sortBy = SortDescriptor.Asc)
    {
        var query = dbContext.Tasks.AsQueryable();

        if (searchTerm != null)
        {
            var search = searchTerm.ToLower();
            query = query.Where(t =>
                t.Title.ToLower().Contains(search) ||
                t.Description.ToLower().Contains(search));
        }

        query = sortBy switch
        {
            SortDescriptor.Desc => query.OrderByDescending(t => t.DueDate),
            _ => query.OrderBy(t => t.DueDate)
        };

        return await query.AsNoTracking().ToListAsync();
    }

    public async Task<Tasks> AddTask(Tasks task)
    {
        var addedEntity = dbContext.Add(task);
        await dbContext.SaveChangesAsync();
        return addedEntity.Entity;
    }

    public async Task<Tasks> UpdateTask(int id, Tasks task)
    {
        var existingTask = await dbContext.Tasks.FindAsync(id) ??
            throw new NotFoundException($"Task, {id}, could not be found");

        existingTask.Title = task.Title;
        existingTask.Description = task.Description;
        existingTask.Status = task.Status;
        existingTask.Priority = task.Priority;
        existingTask.DueDate = task.DueDate;

        var updatedTask = dbContext.Update(existingTask);

        await dbContext.SaveChangesAsync();

        return updatedTask.Entity;
    }

    public async Task DeleteTask(int id)
    {
        var task = await dbContext.Tasks.FindAsync(id)
                            ?? throw new NotFoundException($"Task, {id}, could not be found");

        dbContext.Tasks.Remove(task);
        await dbContext.SaveChangesAsync();
    }
}