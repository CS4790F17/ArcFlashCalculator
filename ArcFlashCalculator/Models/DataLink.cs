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
        public static void LogError(Exception e)
        {
            using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
            {
                if (db.Database.Exists())
                {
                    Error error = new Error();
                    error.Errors = e.ToString();
                    db.errors.Add(error);
                }
            }
        }

        public static List<UserInputs60Hz> GetAllUserInputs60Hz()
        {
            try
            {
                using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
                {
                    if (db.Database.Exists())
                    {
                        List<UserInputs60Hz> uiList = db.userInputs60Hz.ToList();
                        return uiList;
                    }
                    else
                    {
                        List<UserInputs60Hz> uiList = new List<UserInputs60Hz>();
                        return uiList;
                    }
                }
            }
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void CreateUserInputs60Hz(UserInputs60Hz ui)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void DeleteUserInputs60Hz(int? id)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static List<UserInputsDC> GetAllUserInputsDC()
        {
            try
            {
                using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
                {
                    if (db.Database.Exists())
                    {
                        List<UserInputsDC> uiList = db.userInputsDC.ToList();
                        return uiList;
                    }
                    else
                    {
                        List<UserInputsDC> uiList = new List<UserInputsDC>();
                        return uiList;
                    }
                }
            }
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void CreateUserInputsDC(UserInputsDC ui)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void DeleteUserInputsDC(int? id)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static List<Users> GetAllUsers()
        {
            try
            {
                using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
                {
                    if (db.Database.Exists())
                    {
                        List<Users> uiList = db.users.ToList();
                        return uiList;
                    }
                    else
                    {
                        List<Users> uiList = new List<Users>();
                        return uiList;
                    }
                }
            }
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static Users GetUser(int? id)
        {
            try
            {
                using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
                {
                    if (db.Database.Exists())
                    {
                        Users ui = db.users.Find(id);
                        return ui;
                    }
                    else
                    {
                        Users ui = new Users();
                        return ui;
                    }
                }
            }
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static Users GetUser(string username)
        {
            try
            {
                using (ArcCalculatorDbContext db = new ArcCalculatorDbContext())
                {
                    if (db.Database.Exists())
                    {
                        Users ui = db.users.Where(u => u.Email == username).First();
                        return ui;
                    }
                    else
                    {
                        Users ui = new Users();
                        return ui;
                    }
                }
            }
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void CreateUser(Users u)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void DeleteUser(int? id)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
            }
        }

        public static void UpdateUser(Users u, EntityState Modified)
        {
            try
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
            catch (Exception e)
            {
                LogError(e);
                throw;
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

        [DisplayName("Email")]
        [Required(ErrorMessage = "An Email is required")]
        public string Email { get; set; }

        [DisplayName("Password")]
        [Required(ErrorMessage = "A Password is required")]
        public string Password { get; set; }

        public DateTime DateCreated { get; set; }

        public bool AdminBit { get; set; }
    }

    [Table("Errors")]
    public class Error
    {
        [Key]
        public int Id { get; set; }

        public string Errors { get; set; }
    }

    public class ArcCalculatorDbContext : DbContext
    {
        public DbSet<UserInputs60Hz> userInputs60Hz { get; set; }
        public DbSet<UserInputsDC> userInputsDC { get; set; }
        public DbSet<Users> users { get; set; }
        public DbSet<Error> errors { get; set; }
    }
}

