# ArcFlashCalculator
The Arc Flash Calculator is developed to provide professional electricians safety recommendations for their operating environment. The calculator allows the trained technicians to input a series of parameters detailing their work environment after which a series of safety precautions and PPE recomendations will be displayed. 

This application is intended to be utilized by TRAINED and QUALIFIED personnel who must design, repair, troubleshoot or install potentially hazardous electrical equipment in the performance of their duties. It is not intended as a stand-alone electrical safety guide, rather as a single part in a larger overall safety analysis. Additional training may be required as deemed adequate by supervisory staff.

If the operating environment has equipment, hazards or environmental factors that are not covered by this application please refer to your organization's Electrical Safety Subject Matter Expert.  

## Getting Started 
To access as a user you will need a modern web browser and the URL of the server where the application is hosted. 
To run this project on a local machine you will need Visual Studio 2017 and a modern web browser.

## Usage

### User Usage
To utilize this application the user will begin at the homepage where they will acknowledge a safety warning and be presented with a series of options for calculations as well as information about the application itself. After selecting one of the calculation options (60Hz Power, DC, Capacitor, Battery, Sub-RF (1Hz-3kHz)) where the user will be prompted to enter various values regarding the system and the environment. Upon entering these values the user will be shown various safety calculations regarding the operation as well as charts and tables showing safety information based upon the user's information. They will also recieve the recommended PPE for the operation as well.

### Admin Usage
A special feature of this Arc Flash Calculator is the reporting capabilities that are made available to members with a admin login. Upon selecting the "Admin Login" button in the top right section of the navigation bar the user will have the option of logging in to an admin console. There are two levels of administrators for this application. A "Super" admin who will have account management rights for all of the accounts as well as reporting rights and then standard admin accounts that will be only have access to the reporting features. The reporting features that are available will allow the admin users to track the IP addresses of users that visit the site to determine where the usage is focused, see what values the users have been inputting for their calculations and what their results were. This will assist the application administrators and developers in determining the usage patterns for future updates of the Arc Flash Calculator application.  

## Built With
* [ASP.NET](https://www.asp.net/) - The Web Framework
* [MVC 5](https://docs.microsoft.com/en-us/aspnet/mvc/mvc5) - Software Architecture Pattern 
* [SQL Server 2014](https://www.microsoft.com/en-us/sql-server/sql-server-2017) - Database Management System 
* [Visual Studio 2017](https://www.visualstudio.com/) - Integrated Development Environment 

## Versioning
CURRENT: v1
## Authors
* Landon Tholen 
* Daniel Woodward
* Kevin Williams
* Alex Ala
* Nicholas Hayes
* Sean O'Neil 
* Wesley Smith 
* U.S. Army Research Lab
* DoD's Defense Safety Oversight Council Electrical Safety Working Group

## License 

## Acknowledgements
* Special Thanks to Professor Rob Hilton for guiding this capstone project 
* Parts of this application are from an arc flash calculator developed by the US Army Research Laboratory and DoD's Defense Safety Oversight Council Electrical Safety Working Group. http://apps.ctc.com/esafe-pro/
