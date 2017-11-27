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
        public static List<UserInputs60Hz> GetAllUserInputs60Hz()
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    List<UserInputs60Hz> uiList = db.userInputs60Hz.ToList();
                    return uiList;
                } else
                {
                    List<UserInputs60Hz> uiList = new List<UserInputs60Hz>();
                    return uiList;
                }
            }
        }

        public static void CreateUserInputs60Hz(UserInputs60Hz ui)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    db.userInputs60Hz.Add(ui);
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteUserInputs60Hz(int? id)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    UserInputs60Hz ui = db.userInputs60Hz.Find(id);
                    db.userInputs60Hz.Remove(ui);
                    db.SaveChanges();
                }
            }
        }

        public static List<UserInputsDC> GetAllUserInputsDC()
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    List<UserInputsDC> uiList = db.userInputsDC.ToList();
                    return uiList;
                } else
                {
                    List<UserInputsDC> uiList = new List<UserInputsDC>();
                    return uiList;
                }
            }
        }

        public static void CreateUserInputsDC(UserInputsDC ui)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    db.userInputsDC.Add(ui);
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteUserInputsDC(int? id)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    UserInputsDC ui = db.userInputsDC.Find(id);
                    db.userInputsDC.Remove(ui);
                    db.SaveChanges();
                }
            }
        }

        public static List<Users> GetAllUsers()
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    List<Users> uiList = db.users.ToList();
                    return uiList;
                } else
                {
                    List<Users> uiList = new List<Users>();
                    return uiList;
                }
            }
        }

        public static Users GetUser(int? id)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    Users ui = db.users.Find(id);
                    return ui;
                } else
                {
                    Users ui = new Users();
                    return ui;
                }
            }
        }

        public static Users GetUser(string username)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    Users ui = db.users.Where(u => u.Username == username).First();
                    return ui;
                }
                else
                {
                    Users ui = new Users();
                    return ui;
                }
            }
        }

        public static void CreateUser(Users u)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    db.users.Add(u);
                    db.SaveChanges();
                }
            }
        }

        public static void DeleteUser(int? id)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    Users ui = db.users.Find(id);
                    db.users.Remove(ui);
                    db.SaveChanges();
                }
            }
        }

        public static void UpdateUser(Users u, EntityState Modified)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    db.Entry(u).State = Modified;
                    db.SaveChanges();
                }
            }
        }
    }

    [Table("Errors")]
    public class Errors
    {
        [Key]
        public int Id { get; set; }
        public string Error { get; set; }
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

        public DateTime? date { get; set; }
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

        public DateTime? date { get; set; }
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

        public DateTime LastLogin { get; set; }

        public int bitAdmin { get; set; }
    }

    public class ArcCalculatorDbContext : DbContext
    {
        public DbSet<UserInputs60Hz> userInputs60Hz { get; set; }
        public DbSet<UserInputsDC> userInputsDC { get; set; }
        public DbSet<Users> users { get; set; }
    }
}