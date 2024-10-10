using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using LibraryManagementSystem.Models;
using LibraryManagementSystem.Data;

namespace LibraryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == request.Email || u.UserName == request.UserName);

            if (user == null)
                return Unauthorized("User not found");

            if (!VerifyPasswordHash(request.Password, user.PasswordHash))
                return Unauthorized("Incorrect password");

            return Ok("Login successful");
        }

        // Optional: Method to register a new user
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            var existingUser = _context.Users.SingleOrDefault(u => u.Email == request.Email);

            if (existingUser != null)
                return BadRequest("Email is already registered");

            var passwordHash = HashPassword(request.Password);

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                PasswordHash = passwordHash
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User registered successfully");
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPasswordHash(string password, string storedHash)
        {
            var hash = HashPassword(password);
            return hash == storedHash;
        }
    }
}
