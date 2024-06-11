using librarycore.DTOs;
using librarycore.Models;
using librarycore.Repositories;

namespace librarycore.Services
{
    public class AutorService : CommonService<AutorDto, AutorInsertDto, AutorUpdateDto>
    {
        private IRepository<Autor> _repository;

        public AutorService(IRepository<Autor> repository) 
        {
            _repository = repository;
        }
        
        public override Task<AutorDto> Add(AutorInsertDto entityDto)
        {
            throw new NotImplementedException();
        }

        public override Task<AutorDto> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public override Task<AutorDto> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public override async Task<IEnumerable<AutorDto>> Get()
        {
            var autores = await _repository.GetAll();
            return autores.Select(autor => new AutorDto
            {
                Id = autor.Id,
                Nombre = autor.Nombre,
            });
        }

        public override Task<AutorDto> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public override Task<IEnumerable<AutorDto>> SearchBy(string search)
        {
            throw new NotImplementedException();
        }

        public override Task<AutorDto> Update(int id, AutorUpdateDto entityDto)
        {
            throw new NotImplementedException();
        }
    }
}
