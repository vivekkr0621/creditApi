﻿namespace creditApi.Models
{
    public class SignUpRequestModel
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
