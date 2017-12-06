using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ArcFlashCalculator.Models
{
    public class ViewModels
    {
        public static List<UserInputs60Hz> GetAllUserInputs60Hz()
        {
            return DataLink.GetAllUserInputs60Hz();
        }

        public static void CreateUserInputs60Hz(UserInputs60Hz ui)
        {
            DataLink.CreateUserInputs60Hz(ui);
        }

        public static void DeleteUserInputs60Hz(int? id)
        {
            DataLink.DeleteUserInputs60Hz(id);
        }

        public static List<UserInputsDC> GetAllUserInputsDC()
        {
            return DataLink.GetAllUserInputsDC();
        }

        public static void CreateUserInputsDC(UserInputsDC ui)
        {
            DataLink.CreateUserInputsDC(ui);
        }

        public static void DeleteUserInputsDC(int? id)
        {
            DataLink.DeleteUserInputsDC(id);
        }

        public static List<Users> GetAllUsers()
        {
            return DataLink.GetAllUsers();
        }

        public static Users GetUser(int? id)
        {
            return DataLink.GetUser(id);
        }

        public static Users GetUser(string email)
        {
            return DataLink.GetUser(email);
        }

        public static bool CheckForUser(string email)
        {
            return DataLink.CheckForUser(email);
        }

        public static void CreateUser(Users u)
        {
            DataLink.CreateUser(u);
        }

        public static void DeleteUser(int? id)
        {
            DataLink.DeleteUser(id);
        }

        public static void UpdateUser(Users u, EntityState Modified)
        {
            DataLink.UpdateUser(u, Modified);
        }
    }

    public class Power60Hz
    {
        public Power60Hz()
        {
            //Assign defaults to each list
            EquipmentList.Add("Option1");
            EquipmentList.Add("Option2");
            EquipmentList.Add("Option3");
            EquipmentList.Add("Option4");

            WorkModeList.Add("Option1");
            WorkModeList.Add("Option2");
            WorkModeList.Add("Option3");
            WorkModeList.Add("Option4");

            ConductTypeList.Add("Copper");
            ConductTypeList.Add("Aluminum");

            ConduitTypeList.Add("PVC");
            ConduitTypeList.Add("Aluminum");
            ConduitTypeList.Add("Steel");
        }
        //Lists for populating combo boxes
        public List<string> EquipmentList = new List<string>();
        public List<string> WorkModeList = new List<string>();
        public List<string> ConductTypeList = new List<string>();
        public List<string> ConduitTypeList = new List<string>();

        //Variables that get assigned
        public UserInputs60Hz Inputs { get; set; }
        public string EquipmentType { get; set; }
        public string WorkMode { get; set; }
        public bool CalcImpedance { get; set; }
        public double CableLength { get; set; }
        public double ConductorSize { get; set; }
        public double NumOfConductors { get; set; }
        public string ConductType { get; set; }
        public string ConduitType { get; set; }
    }

    public class PowerDC
    {
        public PowerDC()
        {
            //Assign defaults to each list
            WorkModeList.Add("Option1");
            WorkModeList.Add("Option2");
            WorkModeList.Add("Option3");
            WorkModeList.Add("Option4");
        }

        //Lists for populating combo boxes
        public List<string> WorkModeList = new List<string>();

        //Variables that get assigned
        public UserInputsDC Inputs { get; set; }
        public string WorkMode { get; set; }
    }

    public class Capacitors
    {
        public Capacitors()
        {
            //Assign defaults to each list
            WorkModeList.Add("Option1");
            WorkModeList.Add("Option2");
            WorkModeList.Add("Option3");
            WorkModeList.Add("Option4");
        }

        //Lists for populating combo boxes
        public List<string> WorkModeList = new List<string>();

        //Variables that get assigned
        public int CapicitorVal { get; set; }
        public int Voltage { get; set; }
        public string WorkMode { get; set; }
    }

    public class SubRF
    {
        public SubRF()
        {
            //Assign defaults to each list
            WorkModeList.Add("Option1");
            WorkModeList.Add("Option2");
            WorkModeList.Add("Option3");
            WorkModeList.Add("Option4");
        }

        //Lists for populating combo boxes
        public List<string> WorkModeList = new List<string>();

        //Variables that get assigned
        public int ExpACVoltage { get; set; }
        public int AvailSCC { get; set; }
        public decimal DurofExp { get; set; }
        public string WorkMode { get; set; }
    }

    public class Battery
    {
        public Battery()
        {
            //Assign defaults to each list
            WorkModeList.Add("Option1");
            WorkModeList.Add("Option2");
            WorkModeList.Add("Option3");
            WorkModeList.Add("Option4");

            BatteryTypeList.Add("Option1");
            BatteryTypeList.Add("Option2");
            BatteryTypeList.Add("Option3");
            BatteryTypeList.Add("Option4");
        }

        //Lists for populating combo boxes
        public List<string> WorkModeList = new List<string>();
        public List<string> BatteryTypeList = new List<string>();

        //Variables that get assigned
        public string BatteryType { get; set; }
        public int Voltage { get; set; }
        public int SCC { get; set; }
        public decimal DurofExp { get; set; }
        public string WorkMode { get; set; }
    }

    public class ChangePassword
    {
        public ChangePassword()
        {
            user = new Users();
            confirmError = false;
            UserOrPasswordError = false;
            PasswordComplexityError = false;
            blankFieldError = false;
        }

        public Users user { get; set; }
        public string newPassword { get; set; }
        public string confirmPassword { get; set; }
        public bool confirmError { get; set; }
        public bool UserOrPasswordError { get; set; }
        public bool PasswordComplexityError { get; set; }
        public bool blankFieldError { get; set; }
    }

    public class Login
    {
        public Login()
        {
            user = new Users();
            Error = false;
        }

        public Users user { get; set; }
        public bool Error { get; set; }
    }

    public class UserIP
    {
        public UserIP()
        {

        }

        public string IPAddress { get; set; }
        public DateTime? DateAdded { get; set; }
    }

    public class CreateNewUser
    {
        public CreateNewUser()
        {
            user = new Users();
            passwordError = false;
            emailError = false;
            blankFieldError = false;
        }

        public Users user { get; set; }
        public bool passwordError { get; set; }
        public bool emailError { get; set; }
        public bool blankFieldError { get; set; }
    }

    public class AdminControl
    {
        public AdminControl()
        {
            users = ViewModels.GetAllUsers();
            isRootAdmin = false;
        }

        public List<Users> users { get; set; }
        public bool isRootAdmin { get; set; }
    }

    public class AdminChangePassword
    {
        public AdminChangePassword()
        {
            user = new Users();
            ComplexityError = false;
        }

        public Users user { get; set; }
        public string newPassword { get; set; }
        public string confirmPassword { get; set; }
        public bool confirmError { get; set; }
        public bool ComplexityError { get; set; }
        public bool blankFieldError { get; set; }
    }
}