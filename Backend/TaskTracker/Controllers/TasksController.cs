using Microsoft.AspNetCore.Mvc;
using TaskTracker.Contracts;
using TaskTracker.Entities;
using TaskTracker.Extensions;
using TaskTracker.Interfaces;

namespace TaskTracker.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(List<TaskDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllTasks(
        [FromQuery] string? term,
        [FromQuery] SortDescriptor sort,
        CancellationToken cancellationToken)
    {
        var response = await _taskService.GetAll(term, sort);

        return response.ToHttpResult();
    }

    [HttpGet("{id:int}")]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetTaskById(
        [FromRoute] int id,
        CancellationToken cancellationToken)
    {
        var response = await _taskService.GetById(id);

        return response.ToHttpResult();
    }

    [HttpPost]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateNewTask(
        [FromBody] CreateTaskDTO task,
        CancellationToken cancellationToken)
    {
        var response = await _taskService.Add(task.MapToDomain());

        return response.ToHttpResult();
    }

    [HttpPut("{id:int}")]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateTask(
        [FromRoute] int id,
        [FromBody] UpdateTaskDTO task,
        CancellationToken cancellationToken)
    {
        if (id != task.Id)
        {
            return BadRequest($"ID Mismatch");
        }

        var response = await _taskService.Update(id, task.MapToDomain());

        return response.ToHttpResult();
    }

    [HttpDelete("{id:int}")]
    [ProducesDefaultResponseType]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteTask(
        [FromRoute] int id,
        CancellationToken cancellationToken)
    {
        var response = await _taskService.DeleteTask(id);
        return response.ToHttpResult();
    }
}