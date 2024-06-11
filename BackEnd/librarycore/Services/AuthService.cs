using librarycore.DTOs;
using librarycore.Models;
using librarycore.Repositories;

namespace librarycore.Services
{
    public class AuthService : IAuthService<UsuarioDto, UsuarioDtoResponse>
    {
        private readonly IRepository<Usuario> _repository;
        public AuthService(IRepository<Usuario> repository) 
        {
            _repository = repository;
        }

        public async Task<UsuarioDtoResponse> Login(UsuarioDto entity)
        {
            var userCollection = await _repository.GetAll();
            var userLogged = userCollection.Where(user => user.Username.ToLower().Equals(entity.Username.ToLower()) && user.Password.ToLower().Equals(entity.Password)).FirstOrDefault();
            if (userLogged is null) return null;

            return new UsuarioDtoResponse
            {
                Username = entity.Username,
                Status = 1,
                Logged = DateTime.Now
            };
        }
    }
}
