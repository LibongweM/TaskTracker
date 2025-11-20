using Microsoft.AspNetCore.Mvc;
using TaskTracker.Entities;
using TaskTracker.Repository;

[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly ITaskRepository _taskRepository;

    public TasksController(ITaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    [HttpGet]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(List<TaskDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<List<TaskDTO>>> GetAllTasks(
        [FromQuery] string? term,
        [FromQuery] SortDescriptor sort,
        CancellationToken cancellationToken)
    {
        var response = await _taskRepository.GetTasks(term, sort);

        return Ok(response.MapToDTOList());
    }

    [HttpGet("{id:int}")]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TaskDTO>> GetTaskById(
        [FromRoute] int id,
        CancellationToken cancellationToken)
    {
        var response = await _taskRepository.GetTaskById(id);

        return Ok(response.MapToDTO());
    }

    [HttpPost]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TaskDTO>> CreateNewTask(
        [FromBody] CreateTaskDTO task,
        CancellationToken cancellationToken)
    {
        var response = await _taskRepository.AddTask(task.MapToDomain());

        return CreatedAtAction(nameof(GetTaskById), new { id = response.Id }, response);
    }

    [HttpPut("{id:int}")]
    [ProducesDefaultResponseType]
    [ProducesResponseType(typeof(TaskDTO), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<TaskDTO>> UpdateTask(
        [FromRoute] int id,
        [FromBody] UpdateTaskDTO task,
        CancellationToken cancellationToken)
    {
        if (id != task.Id)
        {
            return BadRequest($"ID Mismatch");
        }

        var response = await _taskRepository.UpdateTask(id, task.MapToDomain());

        return Ok(response);
    }

    [HttpDelete("{id:int}")]
    [ProducesDefaultResponseType]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult> DeleteTask(
        [FromRoute] int id,
        CancellationToken cancellationToken)
    {
        await _taskRepository.DeleteTask(id);
        return NoContent();
    }
}