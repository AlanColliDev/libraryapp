using librarycore.DTOs;
using librarycore.Services;
using Microsoft.AspNetCore.Mvc;

namespace librarycore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriaController : Controller
    {
        private readonly CommonService<CategoriaDto, CategoriaInsertDto, CategoriaUpdateDto> _categoriaService;

        public CategoriaController([FromKeyedServices("categoriaService")] CommonService<CategoriaDto, CategoriaInsertDto, CategoriaUpdateDto> categoriaService) 
        { 
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<IEnumerable<CategoriaDto>> Get()
        {
            var categorias = await _categoriaService.Get();
            return categorias;
        }
    }
}
