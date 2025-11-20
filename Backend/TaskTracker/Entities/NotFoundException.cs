namespace TaskTracker.Entities
{
    public class NotFoundException(string message) : Exception(message)
    {
    }
}