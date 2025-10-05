using creditService.Interface;
using creditService.AuthServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using creditDataBase.Interface;
using creditDataBase.Repositories;

namespace creditService.Helper
{
    public static class ServiceRegister
    {
        public static void RegisterServices(IServiceCollection services)
        {
            RegisterRepository(services);
            // Register your services here
            services.AddScoped<IAuthService, AuthService>();
        }

        private static void RegisterRepository(IServiceCollection services)
        {
            // Register your repository here
            services.AddScoped<IAuthRepository, AuthRepository>();
        }
    }
}
