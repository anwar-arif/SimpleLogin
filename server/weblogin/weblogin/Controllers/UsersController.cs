using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weblogin.Models;

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

        [HttpPut]
        public async Task<ActionResult<IEnumerable<User>>> LogIn(User user)
        {
            Console.WriteLine("Called");
            var existingUser = CanLogin(user);
            Console.WriteLine("called");
            return CreatedAtAction("Login success", user);
        }

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        private bool UserExists(string Email)
        {
            return _context.Users.Any(e => e.Email == Email);
        }

        private bool CanLogin(User user) 
        {
            return _context.Users.Any(e => e.Email == user.Email && e.Password == user.Password);
        }
    }
}
