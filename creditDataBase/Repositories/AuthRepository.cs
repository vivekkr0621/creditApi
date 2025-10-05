using creditDataBase.Interface;
using creditDataBase.Models;
using creditDataBase.SQLConnection;
using creditModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace creditDataBase.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly SqlDbContext _context;

        public AuthRepository(SqlDbContext context)
        {
            _context = context;
        }
        public bool IsUserExist(string userId)
        {
            return _context.UserDetails.Any(u => u.UserId == userId);
        }
        public bool SignUp(SignUpRequestDTO model)
        {
            try
            {
                var result = _context.UserDetails.Add(new UserDetails
                {
                    Id = 2,
                    UserId = model.UserId,
                    Password = model.Password,
                    IsActive = true
                });
                _context.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                return false;
            }
            
        }
        public bool Login(SiginRequestDTO request)
        {
            return _context.UserDetails.Any(u => u.UserId == request.UserId 
                && u.Password == request.Password);
        }
    }
}
