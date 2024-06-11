using librarycore.DTOs;
using librarycore.Models;
using librarycore.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace librarycore.Services
{
    public class LibroService : CommonService<LibroDto, LibroInsertDto, LibroUpdateDto>
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

        public override async Task<IEnumerable<LibroDto>> Get()
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
        public override Task<LibroDto> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public override async Task<LibroDto> Add(LibroInsertDto entityDto)
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

        public override Task<LibroDto> Update(int id, LibroUpdateDto entityDto)
        {
            var libro = new Libro
            {
                Isbn = entityDto.Isbn,
                Titulo = entityDto.Titulo,
                Descripcion = entityDto.Descripcion,
                AutorId = entityDto.AutorId,
                CategoriaId = entityDto.CategoriaId,
                Stock = entityDto.Stock,
                Precio = entityDto.Precio,
            };

            _repository.Update(libro);

            var editedLibro = new LibroDto
            {
                Isbn = entityDto.Isbn,
                Titulo = entityDto.Titulo,
                Descripcion = entityDto.Descripcion,
                Stock = entityDto.Stock,
                Precio = entityDto.Precio,
            };

            return Task.FromResult(editedLibro);
        }

        public override async Task<LibroDto> Delete(string isbn)
        {
            var deletedLibro = await _repository.GetById(isbn);
            if (deletedLibro is null) return null;
            var libro = _repository.Delete(deletedLibro);
            await _repository.Save();

            var response = new LibroDto
            {
                Isbn = libro.Isbn,
                Descripcion = libro.Descripcion,
                Precio=libro.Precio
            };

            return response;
        }

        public override Task<LibroDto> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public override async Task<IEnumerable<LibroDto>> SearchBy(string search)
        {
            var collectLibros = await _repository.GetAll(lib => lib.Categoria, lib => lib.Autor);
            var searched = collectLibros.Where(b => b.Isbn.ToLower().Contains(search.ToLower()) || b.Titulo.ToLower().Contains(search.ToLower())).ToList();

            return searched.Select(libro => new LibroDto
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
    }
}
