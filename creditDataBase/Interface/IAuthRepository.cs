using creditModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace creditDataBase.Interface
{
    public interface IAuthRepository
    {
        public bool IsUserExist(string userId);
        public bool SignUp(SignUpRequestDTO model);
        public bool Login(SiginRequestDTO request);
    }
}
