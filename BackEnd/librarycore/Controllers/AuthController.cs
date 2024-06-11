using librarycore.DTOs;
using librarycore.Resources;
using librarycore.Services;
using Microsoft.AspNetCore.Mvc;

namespace librarycore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {

        private readonly IAuthService<UsuarioDto, UsuarioDtoResponse> _authService;

        public AuthController(IAuthService<UsuarioDto, UsuarioDtoResponse> authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(UsuarioDto user)
        {
            try
            {
                var logged = await  _authService.Login(user);
                if(logged is null) return NotFound(new ResponseApi
                {
                    Code = 0,
                    Message = "Credenciales incorrectas, usuario no encontrado."
                });
                return Ok (logged);
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
