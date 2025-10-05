using creditModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace creditService.Interface
{
    public interface IAuthService
    {
        public bool SignUp(SignUpRequestDTO model);
        public bool Login(SiginRequestDTO request);

    }
}
