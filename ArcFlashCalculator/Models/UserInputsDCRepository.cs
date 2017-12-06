using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace ArcFlashCalculator.Models
{
    public interface IUserInputsDCRepository
    {
        IEnumerable<UserInputsDC> GetData(out int totalRecords, string globalSearch, int? limitOffset, int? limitRowCount, string orderBy, bool desc);
        IEnumerable<UserInputsDC> GetData(out int totalRecords, int? limitOffset, int? limitRowCount, string orderBy, bool desc);
    }
    public class UserInputsDCRepository : IUserInputsDCRepository
    {

        public IEnumerable<UserInputsDC> GetData(out int totalRecords, string globalSearch, int? limitOffset, int? limitRowCount, string orderBy, bool desc)
        {
           
            
                var query = DataLink.GetAllUserInputsDC().AsQueryable();
                
                if (!String.IsNullOrWhiteSpace(globalSearch))
                {
                    query = query.Where(p => (p.PotMaxExp.ToString() + " " + p.AvailSCC.ToString() + " " + p.Duration.ToString() + " "
                                                + p.IPAddress + " " + p.date.ToString()).Contains(globalSearch));
                }

                totalRecords = query.Count();

                if (!String.IsNullOrWhiteSpace(orderBy))
                {
                    switch (orderBy.ToLower())
                    {
                        case "potmaxep":
                            if (!desc)
                                query = query.OrderBy(p => p.PotMaxExp);
                            else
                                query = query.OrderByDescending(p => p.PotMaxExp);
                            break;
                        case "availscc":
                            if (!desc)
                                query = query.OrderBy(p => p.AvailSCC);
                            else
                                query = query.OrderByDescending(p => p.AvailSCC);
                            break;
                        case "duration":
                            if (!desc)
                                query = query.OrderBy(p => p.Duration);
                            else
                                query = query.OrderByDescending(p => p.Duration);
                            break;
                        case "ipaddress":
                            if (!desc)
                                query = query.OrderBy(p => p.IPAddress);
                            else
                                query = query.OrderByDescending(p => p.IPAddress);
                            break;
                        case "date":
                            if (!desc)
                                query = query.OrderBy(p => p.date);
                            else
                                query = query.OrderByDescending(p => p.date);
                            break;
                    }
                }


                if (limitOffset.HasValue)
                {
                    query = query.Skip(limitOffset.Value).Take(limitRowCount.Value);
                }

                return query.ToList();
            
        }

        public IEnumerable<UserInputsDC> GetData(out int totalRecords, int? limitOffset, int? limitRowCount, string orderBy, bool desc)
        {
            return GetData(out totalRecords, limitOffset, limitRowCount, orderBy, desc);
        }
    }
}
