using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weblogin.Models;
using System.Text.RegularExpressions;

namespace weblogin.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // PUT: api/Users
        [HttpPut]
        public async Task<ActionResult<IEnumerable<User>>> LogIn(User user)
        {
            if (!ValidEmail(user.Email))
            {
                return NotFound("Invalid email");
            }
            if (CanLogin(user))
            {
                return Ok();
            } 
            else
            {
                return NotFound("No such user found");
            }
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (!ValidEmail(user.Email))
            {
                return NotFound("Invalid email");
            }
            if (UserExists(user.Email))
            {
                return NotFound("User already exists with this email");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool UserExists(string Email)
        {
            return _context.Users.Any(e => e.Email == Email);
        }

        private bool CanLogin(User user) 
        {
            return _context.Users.Any(e => e.Email == user.Email && e.Password == user.Password);
        }

        private bool ValidEmail(string email)
        {
            return Regex.IsMatch(email,
                @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-0-9a-z]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
        }
    }
}
