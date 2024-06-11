using librarycore.Database;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace librarycore.Repositories
{
    public class Repository<Entity> : IRepository<Entity> where Entity : class
    {
        private readonly LibraryContext _dbContext;
        private readonly DbSet<Entity> _dbSet;

        public Repository(LibraryContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<Entity>();   
        }

        public async Task<IEnumerable<Entity>> GetAll() => await _dbSet.ToListAsync();
        public async Task<IEnumerable<Entity>> GetAll(params Expression<Func<Entity, object>>[] includeProperties)
        {
            IQueryable<Entity> query = _dbSet;

            foreach (var includeProperty in includeProperties)
                query = query.Include(includeProperty);

            return await query.ToListAsync();
        }
        public async Task<Entity?> GetById<T>(T id) => await _dbSet.FindAsync(id);

        public async Task<Entity> Add(Entity entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public void Update(Entity entity)
        {
            _dbContext.ChangeTracker.Clear();
            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

        public void UpdateFields(Entity entity, params Expression<Func<Entity, object>>[] updatedProperties)
        {
            _dbContext.ChangeTracker.Clear();
            _dbSet.Attach(entity);
            var entry = _dbContext.Entry(entity);

            foreach (var property in updatedProperties)
                entry.Property(property).IsModified = true;

        }

        public Entity Delete(Entity entity)
        {
            _dbSet.Remove(entity);
            return entity;
        }

        public async Task Save() => await _dbContext.SaveChangesAsync();
    }
}
