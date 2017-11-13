﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArcFlashCalculator.Models
{
    public class ViewModels
    {
    }

    public class Power60Hz {
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

    public class Login
    {
        public Login()
        {

        }

        public Users User { get; set; }
    }
}