using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using TaskTracker.Data;
using TaskTracker.Entities;
using TaskTracker.Repository;

namespace TaskTracker.Test;

public class ControllerTests
{
    [Fact]
    public async Task GetAllTasks_ReturnsAllTasks()
    {
        // Arrange
        var provider = TestFactory.BuildServiceProvider();

        using var scope = provider.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<TrackerAppDbContext>();

        // Seed using your real initializer
        SeedData.Initialize(db);
        
        var repo = scope.ServiceProvider.GetRequiredService<ITaskRepository>();
        var controller = new TasksController(repo);

        var result = await controller.GetAllTasks(null, SortDescriptor.Asc, CancellationToken.None);
        var okResult = result.Result as OkObjectResult;
        
        Assert.NotNull(okResult);
        Assert.Equal(200, okResult.StatusCode);
        
        var tasks = Assert.IsAssignableFrom<List<TaskDTO>>(okResult.Value);
        Assert.Equal(3, tasks.Count);
    }
    
    [Fact]
    public async Task UpdateTask_IdMismatch_ReturnsBadRequest()
    {
        // Arrange
        var updateDto = new UpdateTaskDTO { Id = 5, Title = "Updated", Description  = "Updated description" };
        
        var provider = TestFactory.BuildServiceProvider();
        using var scope = provider.CreateScope();
        
        var repo = scope.ServiceProvider.GetRequiredService<ITaskRepository>();
        var controller = new TasksController(repo);

        // Act
        var result = await controller.UpdateTask(10, updateDto, CancellationToken.None);

        // Assert
        var badResult = result.Result as BadRequestObjectResult;
        Assert.NotNull(badResult);
        Assert.Equal(400, badResult.StatusCode);
    }
}