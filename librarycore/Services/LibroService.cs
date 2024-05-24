using librarycore.DTOs;
using librarycore.Models;
using librarycore.Repositories;
using System.Linq;

namespace librarycore.Services
{
    public class LibroService : ICommonService<LibroDto, LibroInsertDto, LibroUpdateDto>
    {
        private IRepository<Libro> _repository; 
        private IRepository<Categoria> _categoriaRepository;
        private IRepository<Autor> _autorRepository;
        public LibroService(IRepository<Libro> repository, IRepository<Categoria> categoriaRepository, IRepository<Autor> autorRepository)
        {
            _repository = repository;
            _categoriaRepository = categoriaRepository;
            _autorRepository = autorRepository;
        }

        public async Task<IEnumerable<LibroDto>> Get()
        {
            var libros = await _repository.GetAll(lib=> lib.Categoria, lib => lib.Autor);

            if (libros is null) return null;

            return libros.Select(libro => new LibroDto
            {
                Isbn = libro.Isbn,
                Titulo = libro.Titulo,  
                Descripcion = libro.Descripcion,
                Autor = libro.Autor.Nombre,
                Categoria = libro.Categoria.Nombre,
                Precio = libro.Precio,
                Stock = libro.Stock,    
            });
        }
        public Task<LibroDto> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<LibroDto> Add(LibroInsertDto entityDto)
        {
            var libro = new Libro()
            {
                Isbn = entityDto.Isbn,  
                Titulo = entityDto.Titulo,
                Descripcion = entityDto.Descripcion,    
                CategoriaId = entityDto.CategoriaId,
                AutorId = entityDto.AutorId,
                Precio = entityDto.Precio,
                Stock = entityDto.Stock,
            };

            await _repository.Add(libro);
            await _repository.Save();

            var categoria = await _categoriaRepository.GetById(libro.CategoriaId);
            var autor = await _autorRepository.GetById(libro.AutorId);

            var libroDto = new LibroDto()
            {
                Isbn = libro.Isbn,
                Titulo = libro.Titulo,
                Descripcion = libro.Descripcion,
                Autor = autor?.Nombre ?? "--",
                Precio = libro.Precio,
                Stock = libro.Stock,
                Categoria = categoria?.Nombre ?? "--"
            };

            return libroDto;
        }

        public Task<LibroDto> Update(int id, LibroUpdateDto entityDto)
        {
            throw new NotImplementedException();
        }

        public Task<LibroDto> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
