using Microsoft.EntityFrameworkCore;
using TaskTracker.Entities;

namespace TaskTracker.Data;

public class TrackerAppDbContext : DbContext
{
    public TrackerAppDbContext(DbContextOptions<TrackerAppDbContext> options) : base(options) { }
    public DbSet<Tasks> Tasks => Set<Tasks>();
}