[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(ArcFlashCalculator.MVCGridConfig), "RegisterGrids")]

namespace ArcFlashCalculator
{
    using System;
    using System.Web;
    using System.Web.Mvc;
    using System.Linq;
    using System.Collections.Generic;

    using MVCGrid.Models;
    using MVCGrid.Web;
    using ArcFlashCalculator.Models;

    public static class MVCGridConfig
    {
        public static void RegisterGrids()
        {
            // Default grid settings
            GridDefaults gridDefaults = new GridDefaults()
            {
                Paging = true,
                ItemsPerPage = 10,
                Sorting = true,
                Filtering = true,
                NoResultsMessage = "Sorry, no results were found"
            };

            // Default column settings
            ColumnDefaults colDefaults = new ColumnDefaults()
            {
                EnableSorting = true
            };

            // Grid Definitions
            MVCGridDefinitionTable.Add("UserInputs60Hz", new MVCGridBuilder<UserInputs60Hz>(colDefaults)
                .WithAuthorizationType(AuthorizationType.AllowAnonymous)
                .WithSorting(sorting: true, defaultSortColumn: "Id", defaultSortDirection: SortDirection.Dsc)
                .WithPaging(paging: true, itemsPerPage: 10, allowChangePageSize: true, maxItemsPerPage: 100)
                .WithAdditionalQueryOptionNames("search")
                .AddColumns(cols =>
                {
                    cols.Add("Id").WithValueExpression((p, c) => c.UrlHelper.Action("detail", "demo", new { id = p.Id }))
                        .WithValueTemplate("<a href='{Value}'>{Model.Id}</a>", false)
                        .WithPlainTextValueExpression(p => p.Id.ToString());
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
                        .WithValueExpression(p => p.IPAddress.ToString());
                    /*         cols.Add("DateAdded").WithHeaderText("Date Added")
                                 .WithVisibility(visible: true, allowChangeVisibility: true)
                                 .WithValueExpression(p => p.DateAdded.HasValue ? p.DateAdded.Value.ToShortDateString() : ""); */
                })
                .WithRetrieveDataMethod((context) =>
                {
                    var options = context.QueryOptions;
                    int totalRecords;
                    string globalSearch = options.GetAdditionalQueryOptionString("search");
                    string sortColumn = options.GetSortColumnData<string>();
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
                .WithPaging(paging: true, itemsPerPage: 10, allowChangePageSize: true, maxItemsPerPage: 100)
                .WithAdditionalQueryOptionNames("search")
                .AddColumns(cols =>
                {
                    cols.Add("Id").WithValueExpression((p, c) => c.UrlHelper.Action("detail", "demo", new { id = p.Id }))
                        .WithValueTemplate("<a href='{Value}'>{Model.Id}</a>", false)
                        .WithPlainTextValueExpression(p => p.Id.ToString());
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
                    /*         cols.Add("DateAdded").WithHeaderText("Date Added")
                                 .WithVisibility(visible: true, allowChangeVisibility: true)
                                 .WithValueExpression(p => p.DateAdded.HasValue ? p.DateAdded.Value.ToShortDateString() : ""); */
                })
                .WithRetrieveDataMethod((context) =>
                {
                    var options = context.QueryOptions;
                    int totalRecords;
                    string globalSearch = options.GetAdditionalQueryOptionString("search");
                    string sortColumn = options.GetSortColumnData<string>();
                    var items = repo.GetData(out totalRecords, globalSearch, options.GetLimitOffset(), options.GetLimitRowcount(),
                        sortColumn, options.SortDirection == SortDirection.Dsc);
                    return new QueryResult<UserInputsDC>()
                    {
                        Items = items,
                        TotalRecords = totalRecords
                    };
                })
            );

  /*          MVCGridDefinitionTable.Add("UserIPs", new MVCGridBuilder<UserIPs>(colDefaults)
    .WithAuthorizationType(AuthorizationType.AllowAnonymous)
    .WithSorting(sorting: true, defaultSortColumn: "Id", defaultSortDirection: SortDirection.Dsc)
    .WithPaging(paging: true, itemsPerPage: 10, allowChangePageSize: true, maxItemsPerPage: 100)
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
        var items = repo.GetData(out totalRecords, globalSearch, options.GetLimitOffset(), options.GetLimitRowcount(),
            sortColumn, options.SortDirection == SortDirection.Dsc);
        return new QueryResult<UserIPs>()
        {
            Items = items,
            TotalRecords = totalRecords
        };
    })
);  */

        }
    }
}