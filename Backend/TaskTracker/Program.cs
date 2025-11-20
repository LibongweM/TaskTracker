using Microsoft.AspNetCore.HttpLogging;
using Microsoft.EntityFrameworkCore;
using TaskTracker.Converters;
using TaskTracker.Data;
using TaskTracker.Repository;
using TaskTracker.Repository.Implementation;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalDev",
    policy => policy
    .WithOrigins("http://localhost:3000")
    .AllowAnyHeader()
    .AllowAnyMethod());
});

//In-MemoryDatabase
builder.Services.AddDbContext<TrackerAppDbContext>(options =>
    options.UseInMemoryDatabase("TrackerAppDbContext"));

builder.Services.AddProblemDetails();

builder.Services.AddControllers(o =>
{
    o.Filters.Add<GlobalExceptionFilter>();
});

builder.Services.AddHttpLogging(options =>
{
    options.LoggingFields = HttpLoggingFields.RequestBody | HttpLoggingFields.ResponseBody;
});

builder.Services.AddScoped<ITaskRepository, TaskRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(o =>
    {
        o.DocumentTitle = "Task Tracker";
    });

    using var scope = app.Services.CreateScope();

    var db = scope.ServiceProvider.GetRequiredService<TrackerAppDbContext>();
    SeedData.Initialize(db);
}

app.UseHttpsRedirection();
app.UseCors("LocalDev");
app.UseHttpLogging();

app.UseExceptionHandler();
app.MapControllers();

app.Run();