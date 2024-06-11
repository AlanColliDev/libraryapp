using librarycore.DTOs;
using librarycore.Resources;
using librarycore.Services;
using Microsoft.AspNetCore.Mvc;

namespace librarycore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private CommonService<LibroDto, LibroInsertDto, LibroUpdateDto> _libroService;

        public LibroController([FromKeyedServices("libroService")] CommonService<LibroDto, LibroInsertDto, LibroUpdateDto> libroService)
        {
            _libroService = libroService;
        }

        [HttpGet]
        public async Task<IEnumerable<LibroDto>> Get()
        {
            var libros = await _libroService.Get();
            return libros;
        }

        [HttpPost]
        public async Task<IActionResult> Add(LibroInsertDto entity)
        {
            try
            {
                var libro = await _libroService.Add(entity);
                return Ok(libro);
            }
            catch (Exception ex) 
            { 
                return BadRequest(new ResponseApi
                {
                    Code = -1,
                    Message = ex.Message
                });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string isbn)
        {
            try
            {
                var libro = await _libroService.Delete(isbn);
                if (libro is null)
                    return BadRequest(new ResponseApi { Code = 0, Message = $"El Libro con ISBN: {isbn} no existe." });
                var response = new ResponseApi
                {
                    Code = 1, 
                    Message = $"El Libro con ISBN: {libro.Isbn} se eliminó exitosamente."
                };
                return Ok(response);
            }
            catch (Exception ex )
            {
                return BadRequest(new ResponseApi
                {
                    Code = -1,
                    Message = ex.Message
                });
                throw;
            }
        }

        [HttpGet]
        [Route("Search")]
        public async Task<IEnumerable<LibroDto>> Search([FromQuery] string search)
        {
            var libros = await _libroService.SearchBy(search);
            if (libros is null) return null;
            return libros;
        }
    }
}