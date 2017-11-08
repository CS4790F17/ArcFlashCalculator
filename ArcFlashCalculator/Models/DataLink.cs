using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Data.Entity;

namespace ArcFlashCalculator.Models
{
    public class DataLink
    {
    }

    [Table("UserInputs60Hz")]
    public class UserInputs60Hz
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Transformer Size")]
        [Required(ErrorMessage = "A Transformer Size is required")]
        public int TransSize { get; set; }

        [DisplayName("Impedance")]
        [Required(ErrorMessage = "An Impedance is required")]
        public int Impedance { get; set; }

        [DisplayName("Short Circuit Current")]
        [Required(ErrorMessage = "A Short Circuit Current is required")]
        public int SCC { get; set; }

        [DisplayName("Fault Clearing")]
        [Required(ErrorMessage = "A Fault Clearing value is required")]
        public decimal FaultClearing { get; set; }

        [DisplayName("Voltage")]
        [Required(ErrorMessage = "A Voltage is required")]
        public int Voltage { get; set; }

        [DisplayName("Output Energy in Free Air")]
        [Required(ErrorMessage = "A Output Energy in Free Air is required")]
        public decimal OEInFreshAir { get; set; }

        public string IPAddress { get; set; }
    }

    [Table("UserInputsDC")]
    public class UserInputsDC
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Potential Maximum Exposure")]
        [Required(ErrorMessage = "A Potential Maximum Exposure is required")]
        public int PotMaxExp { get; set; }

        [DisplayName("Available Short Circuit Current")]
        [Required(ErrorMessage = "An Available Short Circuit Current is required")]
        public int AvailSCC { get; set; }

        [DisplayName("Duration")]
        [Required(ErrorMessage = "A Duration is required")]
        public decimal Duration { get; set; }

        public string IPAddress { get; set; }
    }

    [Table("Users")]
    public class Users
    {
        [Key]
        public int Id { get; set; }

        [DisplayName("Username")]
        [Required(ErrorMessage = "A Username is required")]
        public string Username { get; set; }

        [DisplayName("Password")]
        [Required(ErrorMessage = "A Password is required")]
        public string Password { get; set; }
    }

    public class ArcCalculatorDbContext : DbContext
    {
        public DbSet<UserInputs60Hz> userInputs60Hz { get; set; }
        public DbSet<UserInputsDC> userInputsDC { get; set; }
        public DbSet<Users> users { get; set; }
    }
}