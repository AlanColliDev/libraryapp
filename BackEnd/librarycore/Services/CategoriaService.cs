using librarycore.DTOs;
using librarycore.Models;
using librarycore.Repositories;

namespace librarycore.Services
{
    public class CategoriaService : CommonService<CategoriaDto, CategoriaInsertDto, CategoriaUpdateDto>
    {
        private readonly IRepository<Categoria> _repository; 
        public CategoriaService(IRepository<Categoria> repository) 
        {
            _repository = repository;    
        }

        public override Task<CategoriaDto> Add(CategoriaInsertDto entityDto)
        {
            throw new NotImplementedException();
        }

        public override Task<CategoriaDto> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public override Task<CategoriaDto> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public override async Task<IEnumerable<CategoriaDto>> Get()
        {
            var categorias = await _repository.GetAll();
            return categorias.Select(categoria => new CategoriaDto
            {
                Id = categoria.Id,
                Descripcion = categoria.Descripcion,
                Nombre = categoria.Nombre,  
            });
        }

        public override Task<CategoriaDto> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public override Task<IEnumerable<CategoriaDto>> SearchBy(string search)
        {
            throw new NotImplementedException();
        }

        public override Task<CategoriaDto> Update(int id, CategoriaUpdateDto entityDto)
        {
            throw new NotImplementedException();
        }
    }
}
