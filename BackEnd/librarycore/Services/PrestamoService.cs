using librarycore.DTOs;
using librarycore.Models;
using librarycore.Repositories;
using System.Linq.Expressions;

namespace librarycore.Services
{
    public class PrestamoService : CommonService<PrestamoDto, PrestamoInsertDto, PrestamoUpdateDto>
    {
        private IRepository<Prestamo> _repository;
        private IRepository<Libro> _libroRepository;

        public PrestamoService(IRepository<Prestamo> repository, IRepository<Libro> libroRepository)
        {
            _repository = repository;
            _libroRepository = libroRepository; 
        }

        public override async Task<IEnumerable<PrestamoDto>> Get()
        {
            var prestamos = await _repository.GetAll(lib => lib.Libro, lib => lib.Libro);

            if (prestamos is null) return null;

            return prestamos.Select(prestamo => new PrestamoDto
            {
                Isbn = prestamo.Isbn,
                FechaDevolucion = prestamo.FechaDevolucion,
                FechaPrestamo = prestamo.FechaPrestamo,
                NombrePrestamista = prestamo.NombrePrestamista,
                Observacion = prestamo.Observacion,
                Telefono = prestamo.Telefono,
                Id = prestamo.Id,
                Titulo = prestamo.Libro.Titulo,
                Estatus = prestamo.Estatus
            }).Where(prestamo => prestamo.Estatus.Equals("P") || prestamo.Estatus.Equals("D")); //P => prestado //D => Devuelto
        }

        public override async Task<PrestamoDto> Add(PrestamoInsertDto entityDto)
        {

            var libro = await _libroRepository.GetById<string>(entityDto.Isbn);
            
            if (libro == null || libro.Stock.Equals(0)) throw new Exception("Libro no válido, sin Stock para realizar el préstamo.");
            
            var libroUpdate = new Libro
            {
                Isbn = libro.Isbn,
                Stock = libro.Stock - 1,
                AutorId = libro.AutorId,
                CategoriaId = libro.CategoriaId,
                Descripcion = libro.Descripcion,
                Precio = libro.Precio,
                Titulo = libro.Titulo,
            };

            _libroRepository.Update(libroUpdate);
            await _libroRepository.Save();

            var prestamo = new Prestamo
            {
                Isbn = entityDto.Isbn,
                FechaPrestamo = entityDto.FechaPrestamo,
                FechaDevolucion = entityDto.FechaDevolucion,
                NombrePrestamista = entityDto.NombrePrestamista,
                Observacion = entityDto.Observacion,
                Telefono = entityDto.Telefono,
                Estatus = "P"
            };

            var prestamoAdded = await _repository.Add(prestamo);
            await _repository.Save();

            if (!(prestamoAdded.Id > 0)) return null;

            return new PrestamoDto
            {
                Id = prestamoAdded.Id,
                Isbn = libro.Isbn,
                FechaDevolucion = prestamoAdded.FechaDevolucion,
                FechaPrestamo = prestamoAdded.FechaPrestamo,
                NombrePrestamista = prestamoAdded.NombrePrestamista,
                Observacion = prestamoAdded.Observacion,
                Telefono = prestamoAdded.Telefono,
                Estatus = prestamoAdded.Estatus,
            };

        }

        public override Task<PrestamoDto> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public override Task<PrestamoDto> Delete(string id)
        {
            throw new NotImplementedException();
        }

        public override async Task<PrestamoDto> GetById(int id)
        {
            var prestamo = await _repository.GetById(id);

            if (prestamo is null) return null;

            return new PrestamoDto
            {
                Id = prestamo.Id,
                Isbn  = prestamo.Isbn,
                FechaPrestamo = prestamo.FechaPrestamo,
                FechaDevolucion = prestamo.FechaDevolucion,
                NombrePrestamista = prestamo.NombrePrestamista,
                Observacion = prestamo.Observacion,
                Telefono= prestamo.Telefono,
                Estatus = prestamo.Estatus
            };
        }

        public override Task<IEnumerable<PrestamoDto>> SearchBy(string search)
        {
            throw new NotImplementedException();
        }

        public override async Task<PrestamoDto> Update(int id, PrestamoUpdateDto entityDto)
        {
            var prestamo = await this.GetById(entityDto.Id);

            if (prestamo is null) return null;

            var libro = await _libroRepository.GetById<string>(prestamo.Isbn);

            if (libro == null || libro.Stock.Equals(0)) throw new Exception("Libro no válido.");

            var libroUpdate = new Libro
            {
                Isbn = libro.Isbn,
                Stock = libro.Stock + 1,
            };

            var updatedProperties = new List<Expression<Func<Libro, object>>>
            {
                e => e.Stock
            };

            _libroRepository.UpdateFields(libroUpdate, updatedProperties.ToArray());
            await _libroRepository.Save();

            var prestamoUpd = new Prestamo
            {
                Id = prestamo.Id,
                FechaDevolucion = entityDto.FechaDevolucion,
                Observacion = entityDto.Observacion,
                Estatus = "D"
                
            };

            var updatedPrestamoProperties = new List<Expression<Func<Prestamo, object>>>
            {
                e => e.FechaDevolucion,
                e => e.Observacion,
                e => e.Estatus,
            };

            _repository.UpdateFields(prestamoUpd, updatedPrestamoProperties.ToArray());
            await _repository.Save();


            return new PrestamoDto
            {
                Id = prestamo.Id,
                FechaDevolucion = prestamoUpd.FechaDevolucion,
                FechaPrestamo = prestamoUpd.FechaPrestamo,
                Isbn = prestamo.Isbn,
                NombrePrestamista = prestamo.NombrePrestamista,
                Observacion = prestamo.Observacion,
                Telefono = prestamo.Telefono,
                Estatus = prestamoUpd.Estatus,
                Titulo = libro.Titulo
            };
        }
    }
}
