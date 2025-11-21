using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskTracker.Data;
using TaskTracker.Interfaces;
using TaskTracker.Services;

namespace TaskTracker.Test;

public static class TestFactory
{
    public static ServiceProvider BuildServiceProvider()
    {
        var services = new ServiceCollection();

        services.AddDbContext<TrackerAppDbContext>(options =>
            options.UseInMemoryDatabase("TrackerAppDb"));

        services.AddScoped<ITaskService, TaskService>();

        return services.BuildServiceProvider();
    }
}