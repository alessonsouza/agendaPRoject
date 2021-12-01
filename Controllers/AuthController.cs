using System;
using System.Threading.Tasks;
using AgendaEventos.Interfaces.Services.Security;
using AgendaEventos.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgendaEventos.Controllers
{
    [ApiController]
    [Route("/auth")]
    // [Authorize]
    public class AuthController : ControllerBase
    {
        protected readonly ILogin _loginService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthController(ILogin loginService, IHttpContextAccessor httpContextAccessor)
        {
            _loginService = loginService;
            _httpContextAccessor = httpContextAccessor;
        }


        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Login loginData)
        {
            Response response = new Response();
            try
            {
                ResponseLogin responseLogin = await _loginService.Authenticate(loginData);

                response.Success = true;
                response.Data = responseLogin;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("all-users")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public object allUsers([FromBody] User obj)
        {
            Response response = new Response();
            try
            {
                var resp = _loginService.AllUsers(obj);

                response.Success = true;
                response.Data = resp;
                return Ok(response);

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Error = ex.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("save-user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public object SaveUsers(User obj)
        {
            Response response = new Response();
            try
            {
                var resp = _loginService.SaveUser(obj);
                response.Data = resp;
                response.Success = true;
                return Ok(response);

            }
            catch (Exception e)
            {

                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }

        [HttpPost("update-user")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]

        public object UpdateUsers(User obj)
        {
            Response response = new Response();
            try
            {
                var resp = _loginService.UpdateUser(obj);
                response.Data = resp;
                response.Success = true;
                return Ok(response);

            }
            catch (Exception e)
            {

                response.Success = false;
                response.Error = e.Message;
                return BadRequest(response);
            }
        }


        [HttpGet("check")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(object))]
        public bool Check()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            string userName = user.Identity.Name;
            if (userName == null || userName == "")
            {
                return false;
            }
            return true;


        }
    }
}
