[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ArcFlashCalculator.MVCGridConfig), "RegisterGrids")]

namespace ArcFlashCalculator
{
    using MVCGrid.Models;
    using MVCGrid.Web;
    using System.Web.Mvc;
    using Models;
    public class MVCGridConfig
    {
        public static void RegisterGrids()
        {
            // Default grid settings
            /*       GridDefaults gridDefaults = new GridDefaults()
                   {
                       Paging = true,
                       ItemsPerPage = 10,
                       Sorting = true,
                       Filtering = true,
                       NoResultsMessage = "Sorry, no results were found"
                   }; */

            // Default column settings
            ColumnDefaults colDefaults = new ColumnDefaults()
            {
                EnableSorting = true
            };

            // Grid Definitions

            MVCGridDefinitionTable.Add("UserInputs60Hz", new MVCGridBuilder<UserInputs60Hz>(colDefaults)
                .WithAuthorizationType(AuthorizationType.AllowAnonymous)
                .WithSorting(sorting: true, defaultSortColumn: "Id", defaultSortDirection: SortDirection.Dsc)
            //    .WithPaging(paging: true, itemsPerPage: 10, allowChangePageSize: true, maxItemsPerPage: 100)
                .WithAdditionalQueryOptionNames("search")
                .AddColumns(cols =>
                {
                    cols.Add("Id").WithHeaderText("Id")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.Id.ToString());
                    cols.Add("TransSize").WithHeaderText("TransSize")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.TransSize.ToString());
                    cols.Add("Impedance").WithHeaderText("Impedance")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.Impedance.ToString());
                    cols.Add("SCC").WithHeaderText("SCC")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.SCC.ToString());
                    cols.Add("FaultClearing").WithHeaderText("Fault Clearing")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.FaultClearing.ToString());
                    cols.Add("Voltage").WithHeaderText("Voltage")
                         .WithVisibility(true, true)
                         .WithValueExpression(p => p.Voltage.ToString());
                    cols.Add("OEInFreshAir").WithHeaderText("OEInFreshAir")
                         .WithVisibility(true, true)
                         .WithValueExpression(p => p.OEInFreshAir.ToString());
                    cols.Add("IPAddress").WithHeaderText("IP Address")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.IPAddress);
                    cols.Add("date").WithHeaderText("Date Added")
                        .WithVisibility(visible: true, allowChangeVisibility: true)
                        .WithValueExpression(p => p.date.HasValue ? p.date.Value.ToShortDateString() : "");
                })
                .WithRetrieveDataMethod((context) =>
                {
                    var options = context.QueryOptions;
                    int totalRecords;
                    string globalSearch = options.GetAdditionalQueryOptionString("search");
                    string sortColumn = options.GetSortColumnData<string>();
                    var repo = DependencyResolver.Current.GetService<UserInputs60HzRepository>();
                    var items = repo.GetData(out totalRecords, globalSearch, options.GetLimitOffset(), options.GetLimitRowcount(),
                        sortColumn, options.SortDirection == SortDirection.Dsc);
                    return new QueryResult<UserInputs60Hz>()
                    {
                        Items = items,
                        TotalRecords = totalRecords
                    };
                })
            );

            MVCGridDefinitionTable.Add("UserInputsDC", new MVCGridBuilder<UserInputsDC>(colDefaults)
                .WithAuthorizationType(AuthorizationType.AllowAnonymous)
                .WithSorting(sorting: true, defaultSortColumn: "Id", defaultSortDirection: SortDirection.Dsc)
            //    .WithPaging(paging: true, itemsPerPage: 10, allowChangePageSize: true, maxItemsPerPage: 100)
                .WithQueryStringPrefix("grid2")
                .WithAdditionalQueryOptionNames("search")
                .AddColumns(cols =>
                {
                    cols.Add("Id").WithHeaderText("Id")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.Id.ToString());
                    cols.Add("PotMaxExp").WithHeaderText("PotMaxExp")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.PotMaxExp.ToString());
                    cols.Add("AvailSCC").WithHeaderText("Available SCC")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.AvailSCC.ToString());
                    cols.Add("Duration").WithHeaderText("Duration")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.Duration.ToString());
                    cols.Add("IPAddress").WithHeaderText("IP Address")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.IPAddress.ToString());
                    cols.Add("date").WithHeaderText("Date Added")
                        .WithVisibility(visible: true, allowChangeVisibility: true)
                        .WithValueExpression(p => p.date.HasValue ? p.date.Value.ToShortDateString() : "");
                })
                .WithRetrieveDataMethod((context) =>
                {
                    var options = context.QueryOptions;
                    int totalRecords;
                    string globalSearch = options.GetAdditionalQueryOptionString("search");
                    string sortColumn = options.GetSortColumnData<string>();
                    var repo = DependencyResolver.Current.GetService<UserInputsDCRepository>();
                    var items = repo.GetData(out totalRecords, globalSearch, options.GetLimitOffset(), options.GetLimitRowcount(),
                        sortColumn, options.SortDirection == SortDirection.Dsc);
                    return new QueryResult<UserInputsDC>()
                    {
                        Items = items,
                        TotalRecords = totalRecords
                    };
                })
            );

            MVCGridDefinitionTable.Add("UserIP", new MVCGridBuilder<UserIP>(colDefaults)
                .WithAuthorizationType(AuthorizationType.AllowAnonymous)
                .WithSorting(sorting: true, defaultSortColumn: "Id", defaultSortDirection: SortDirection.Dsc)
         //       .WithPaging(paging: true, itemsPerPage: 10, allowChangePageSize: true, maxItemsPerPage: 100)
                .WithAdditionalQueryOptionNames("search")
                .AddColumns(cols =>
                {
                    cols.Add("IPAddress").WithHeaderText("IP Address")
                        .WithVisibility(true, true)
                        .WithValueExpression(p => p.IPAddress.ToString());
                    cols.Add("DateAdded").WithHeaderText("Date Added")
                        .WithVisibility(visible: true, allowChangeVisibility: true)
                        .WithValueExpression(p => p.DateAdded.HasValue ? p.DateAdded.Value.ToShortDateString() : "");
                })
               .WithRetrieveDataMethod((context) =>
                {
                    var options = context.QueryOptions;
                    int totalRecords;
                    string globalSearch = options.GetAdditionalQueryOptionString("search");
                    string sortColumn = options.GetSortColumnData<string>();
                    var repo = DependencyResolver.Current.GetService<UserIPRepository>();
                    var items = repo.GetData(out totalRecords, globalSearch, options.GetLimitOffset(), options.GetLimitRowcount(),
                        sortColumn, options.SortDirection == SortDirection.Dsc);
                    return new QueryResult<UserIP>()
                    {
                        Items = items,
                        TotalRecords = totalRecords
                    };
                })
);

        }
    }
}