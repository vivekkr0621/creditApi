using creditApi.Models;
using creditModel;
using creditService.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace creditApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        // Private static dictionary to store users
        private static readonly Dictionary<string, string> _users = new Dictionary<string, string>();
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST api/auth/signup
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] SignUpRequestModel request)
        {
            SignUpRequestDTO model = ObjectMapper.Map<SignUpRequestModel, SignUpRequestDTO>(request);
            bool result = _authService.SignUp(model);
            return Ok(result);
        }

        // POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] SiginRequestModel request)
        {
            SiginRequestDTO siginRequest = ObjectMapper.Map<SiginRequestModel, SiginRequestDTO>(request);
            bool result = _authService.Login(siginRequest);
            return Ok(result);
        }

    }
}
