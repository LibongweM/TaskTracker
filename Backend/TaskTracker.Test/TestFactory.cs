using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskTracker.Data;
using TaskTracker.Repository;
using TaskTracker.Repository.Implementation;

namespace TaskTracker.Test;

public static class TestFactory
{
    public static ServiceProvider BuildServiceProvider()
    {
        var services = new ServiceCollection();

        services.AddDbContext<TrackerAppDbContext>(options =>
            options.UseInMemoryDatabase("TrackerAppDb"));

        services.AddScoped<ITaskRepository, TaskRepository>();

        return services.BuildServiceProvider();
    }
}