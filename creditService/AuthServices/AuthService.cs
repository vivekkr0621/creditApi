using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using creditDataBase.Interface;
using creditModel;
using creditService.Interface;

namespace creditService.AuthServices
{
    public class AuthService : IAuthService
    {
        private static readonly Dictionary<string, string> _users = new Dictionary<string, string>();
        private readonly IAuthRepository _authRepository;
        public AuthService(IAuthRepository authRepository) 
        {
            _authRepository = authRepository;
        }

        public bool SignUp(SignUpRequestDTO model)
        {
            if (model.Password != model.ConfirmPassword)
                return false;

            if (_authRepository.IsUserExist(model.UserId))
                return false;

            _authRepository.SignUp(model);
            // Add logic to store user credentials securely
            return true;
        }

        public bool Login(SiginRequestDTO request)
        {
            return _authRepository.Login(request);

        }
    }
}
