using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArcFlashCalculator.Models
{
    /// <summary>
    /// This class makes error handling much easier by allowing all methods to return the 
    /// same thing (this class) but set an error code and message if anything goes wrong. 
    /// Otherwise, you can access whatever data you need in the data property below.
    /// </summary>
    public class ReturnResult
    {
        /// <summary>
        /// The error code produced (if any).
        /// </summary>
        public int ErrCode { get; set; }

        /// <summary>
        /// The error message produced (if any).
        /// </summary>
        public string ErrMessage { get; set; }

        /// <summary>
        /// The data to be passed around (if no errors occur).
        /// </summary>
        public Object data { get; set; }
    }

    /// <summary>
    /// This class provides several constants for setting status/error codes.
    /// </summary>
    public class StatusCode
    {        
        public const int GOOD = 0;
        public const int DATABASE_CONNECTION_FAILED = 1;
        public const int CORRUPTED_DATA = 2;
        public const int GENERAL_ERROR = 3;        
    }
}