using Microsoft.AspNetCore.Mvc;
using TaskTracker.Models;

namespace TaskTracker.Extensions;

public static class ResultExtensions
{
    public static IActionResult ToHttpResult<T>(this Result<T> result)
    {
        if (result.IsSuccess)
            return new OkObjectResult(result.Data);

        return new BadRequestObjectResult(new { error = result.ErrorMessage });
    }

    public static IActionResult ToHttpResult(this Result result)
    {
        if (result.IsSuccess)
            return new NoContentResult();

        return new BadRequestObjectResult(new { error = result.ErrorMessage });
    }
}
