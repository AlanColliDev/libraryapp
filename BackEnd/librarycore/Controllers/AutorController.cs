using librarycore.DTOs;
using librarycore.Services;
using Microsoft.AspNetCore.Mvc;

namespace librarycore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutorController : Controller
    {
        private readonly CommonService<AutorDto, AutorInsertDto, AutorUpdateDto> _autorService;

        public AutorController([FromKeyedServices("autorService")] CommonService<AutorDto, AutorInsertDto, AutorUpdateDto> autorService) 
        {
            _autorService = autorService;   
        }

        [HttpGet]
        public async Task<IEnumerable<AutorDto>> Get()
        {
            var autores = await _autorService.Get();
            return autores;
        }
    }
}
