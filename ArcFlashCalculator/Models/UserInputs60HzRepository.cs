using System;
using System.Collections.Generic;
using System.Linq;

namespace ArcFlashCalculator.Models
{
    public interface IUserInputs60HzRepository
    {
        IEnumerable<UserInputs60Hz> GetData(out int totalRecords, string globalSearch, int? limitOffset, int? limitRowCount, string orderBy, bool desc);
        IEnumerable<UserInputs60Hz> GetData(out int totalRecords, int? limitOffset, int? limitRowCount, string orderBy, bool desc);
    }
    public class UserInputs60HzRepository : IUserInputs60HzRepository
    {

        public IEnumerable<UserInputs60Hz> GetData(out int totalRecords, int? limitOffset, int? limitRowCount, string orderBy, bool desc)
        {
            return GetData(out totalRecords, null, limitOffset, limitRowCount, orderBy, desc);
        }
        public IEnumerable<UserInputs60Hz> GetData(out int totalRecords, string globalSearch, int? limitOffset, int? limitRowCount, string orderBy, bool desc)
        {

            using (var db = new ArcCalculatorDbContext())
            {
                var query = db.userInputs60Hz.AsQueryable();

                if (!String.IsNullOrWhiteSpace(globalSearch))
                {
                    query = query.Where(p => (p.TransSize.ToString() + " " + p.Impedance.ToString() + " " + p.SCC.ToString() + " "
                                                + p.FaultClearing.ToString() + " " + p.Voltage.ToString() + " " + p.FreeAir.ToString() + " "
                                                + p.IPAddress + " " + p.date.ToString()).Contains(globalSearch));
                }

                totalRecords = query.Count();

                if (!String.IsNullOrWhiteSpace(orderBy))
                {
                    switch (orderBy.ToLower())
                    {
                        case "transsize":
                            if (!desc)
                                query = query.OrderBy(p => p.TransSize);
                            else
                                query = query.OrderByDescending(p => p.TransSize);
                            break;
                        case "impedance":
                            if (!desc)
                                query = query.OrderBy(p => p.Impedance);
                            else
                                query = query.OrderByDescending(p => p.Impedance);
                            break;
                        case "scc":
                            if (!desc)
                                query = query.OrderBy(p => p.SCC);
                            else
                                query = query.OrderByDescending(p => p.SCC);
                            break;
                        case "faultclearing":
                            if (!desc)
                                query = query.OrderBy(p => p.FaultClearing);
                            else
                                query = query.OrderByDescending(p => p.FaultClearing);
                            break;
                        case "voltage":
                            if (!desc)
                                query = query.OrderBy(p => p.Voltage);
                            else
                                query = query.OrderByDescending(p => p.Voltage);
                            break;
                        case "FreeAir":
                            if (!desc)
                                query = query.OrderBy(p => p.FreeAir);
                            else
                                query = query.OrderByDescending(p => p.FreeAir);
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
                        case "id":
                            if (!desc)
                                query = query.OrderBy(p => p.Id);
                            else
                                query = query.OrderByDescending(p => p.Id);
                            break;
                    }
                }



                if (limitOffset.HasValue)
                {
                    query = query.Skip(limitOffset.Value).Take(limitRowCount.Value);
                }

                return query.ToList();

            }

        }
    }
}
