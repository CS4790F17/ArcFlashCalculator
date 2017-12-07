using System;
using System.Collections.Generic;
using System.Linq;

namespace ArcFlashCalculator.Models
{
    public interface IUserIPRepository
    {
        IEnumerable<UserIP> GetData(out int totalRecords, string globalSearch, int? limitOffset, int? limitRowCount, string orderBy, bool desc);
    }
    public class UserIPRepository : IUserIPRepository
    {
        public IEnumerable<UserIP> GetData(out int totalRecords, string globalSearch, int? limitOffset, int? limitRowCount, string orderBy, bool desc)
        {

            var inputs60Hz = DataLink.GetAllUserInputs60Hz();

            var inputsDC = DataLink.GetAllUserInputsDC();

            List<UserIP> userIPs = new List<UserIP>();


            foreach (UserInputs60Hz myInput in inputs60Hz)
            {
                UserIP myIP = new UserIP();
                myIP.IPAddress = myInput.IPAddress;
                myIP.DateAdded = myInput.date;

                userIPs.Add(myIP);
            }

            foreach (UserInputsDC myInput in inputsDC)
            {
                UserIP myIP = new UserIP();
                myIP.IPAddress = myInput.IPAddress;
                myIP.DateAdded = myInput.date;

                userIPs.Add(myIP);
            }

            var query = userIPs.AsQueryable();

            if (!String.IsNullOrWhiteSpace(globalSearch))
                {
                    query = query.Where(p => (p.IPAddress + " " + p.DateAdded.ToString()).Contains(globalSearch));
                }

                totalRecords = query.Count();

                if (!String.IsNullOrWhiteSpace(orderBy))
                {
                    switch (orderBy.ToLower())
                    {                        
                        case "ipaddress":
                            if (!desc)
                                query = query.OrderBy(p => p.IPAddress);
                            else
                                query = query.OrderByDescending(p => p.IPAddress);
                            break;
                        case "dateadded":
                            if (!desc)
                                query = query.OrderBy(p => p.DateAdded);
                            else
                                query = query.OrderByDescending(p => p.DateAdded);
                            break;
                    }
                }


                if (limitOffset.HasValue)
                {
                    query = query.Skip(limitOffset.Value).Take(limitRowCount.Value);
                }

                return query.ToList();
            
        }

        public IEnumerable<UserIP> GetData(out int totalRecords, int? limitOffset, int? limitRowCount, string orderBy, bool desc)
        {
            return GetData(out totalRecords, null, limitOffset, limitRowCount, orderBy, desc);
        }
    }
}
