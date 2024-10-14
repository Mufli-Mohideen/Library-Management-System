using System.ComponentModel.DataAnnotations;

namespace LibraryManagementSystem.Models
{
    //User Entity
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;
    }

}
