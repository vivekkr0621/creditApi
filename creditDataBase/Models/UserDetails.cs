using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace creditDataBase.Models
{
    public class UserDetails
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
    }
}
