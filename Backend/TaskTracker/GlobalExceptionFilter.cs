using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TaskTracker.Entities;

namespace TaskTracker;

public class GlobalExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        switch (context.Exception)
        {
            case NotFoundException e:
            {
                context.Result = new ObjectResult(new ProblemDetails
                {
                    Title = "Not Found",
                    Detail = e.Message,
                    Status = StatusCodes.Status404NotFound
                });

                context.ExceptionHandled = true;
            }
                break;
            default:
            {
                context.Result = new ObjectResult(new ProblemDetails
                {
                    Title = "Internal Error",
                    Detail = $"An error occurred while processing the request. | {context.Exception.Source}",
                    Status = StatusCodes.Status500InternalServerError
                });

                context.ExceptionHandled = true;
            }
                break;
        }
    }
}