namespace librarycore.Services
{
    public interface ICommonService<T, Tin, Tup>
    {
        Task<IEnumerable<T>> Get();
        Task<T> GetById(int id);
        Task<T> Add(Tin entityDto); 
        Task<T> Update(int id, Tup entityDto);
        Task<T> Delete(int id);
    }
}
