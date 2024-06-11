
namespace librarycore.Services
{
    public abstract class CommonService<T, Tin, Tup> : ICommonService<T, Tin, Tup>
    {
        public abstract Task<IEnumerable<T>> Get();
        public abstract Task<T> Add(Tin entityDto);
        public abstract Task<T> GetById(int id);
        public abstract Task<T> Update(int id, Tup entityDto);
        public abstract Task<T> Delete(int id);
        public abstract Task<T> Delete(string id);
        public abstract Task<IEnumerable<T>> SearchBy(string search);
    }
}
