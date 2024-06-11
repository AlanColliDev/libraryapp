using System.Linq.Expressions;

namespace librarycore.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();  
        Task<IEnumerable<TEntity>> GetAll(params Expression<Func<TEntity, object>>[] includeProperties);
        Task<TEntity?> GetById<T>(T id);
        Task<TEntity> Add(TEntity entity);
        void Update(TEntity entity);
        void UpdateFields(TEntity entity, params Expression<Func<TEntity, object>>[] updatedProperties);

        TEntity Delete(TEntity entity);
        Task Save();   
    }
}
