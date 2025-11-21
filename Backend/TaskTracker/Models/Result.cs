namespace TaskTracker.Models;

public class Result
{
    public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }

    protected Result(bool isSuccess, string? errorMessage)
    {
        IsSuccess = isSuccess;
        ErrorMessage = errorMessage;
    }
    
    public static Result Success() => new(true, null);
    public static Result Failure(string errorMessage) => new(false, errorMessage);
}

public class Result<T> : Result
{
    public T? Data { get; set; }

    private Result(T data, bool isSuccess, string? errorMessage = null)
        : base(isSuccess, errorMessage)
    {
        Data = data;
        IsSuccess = isSuccess;
        ErrorMessage = errorMessage;
    }
    
    public static Result<T> Success(T value) => new(value, true, null);
    public new static Result<T?> Failure(string error) => new(default, false, error);
}