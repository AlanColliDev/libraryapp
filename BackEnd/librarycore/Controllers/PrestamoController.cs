using librarycore.DTOs;
using librarycore.Resources;
using librarycore.Services;
using Microsoft.AspNetCore.Mvc;

namespace librarycore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrestamoController : Controller
    {
        private CommonService<PrestamoDto, PrestamoInsertDto, PrestamoUpdateDto> _prestamoService;

        public PrestamoController([FromKeyedServices("prestamoService")] CommonService<PrestamoDto, PrestamoInsertDto, PrestamoUpdateDto> prestamoService)
        {
            _prestamoService = prestamoService;
        }

        [HttpGet]
        public async Task<IEnumerable<PrestamoDto>> Get()
        {
            var prestamos = await _prestamoService.Get();
            return prestamos;
        }

        [HttpPost]
        public async Task<IActionResult> Add(PrestamoInsertDto entity)
        {
            try
            {
                var prestamo = await _prestamoService.Add(entity);
                return Ok(prestamo);
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

        [HttpPost]
        [Route("Devolucion")]
        public async Task<IActionResult> Devolver(PrestamoUpdateDto entity)
        {

            try
            {
                var prestamo = await _prestamoService.Update(0, entity);
                return Ok(prestamo);
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
    }
}
