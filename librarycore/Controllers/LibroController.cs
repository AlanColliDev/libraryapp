using librarycore.DTOs;
using librarycore.Services;
using Microsoft.AspNetCore.Mvc;

namespace librarycore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private ICommonService<LibroDto, LibroInsertDto, LibroUpdateDto> _libroService;

        public LibroController([FromKeyedServices("libroService")]ICommonService<LibroDto, LibroInsertDto, LibroUpdateDto> libroService)
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
            var libro = await _libroService.Add(entity);
            return Ok(libro);
        }
    }
}
