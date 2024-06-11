namespace librarycore.Services
{
    public interface IAuthService<TEntity, TResponse>
    {
        Task<TResponse> Login(TEntity entity);
    }
}
