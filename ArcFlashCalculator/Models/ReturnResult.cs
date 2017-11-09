﻿using System;
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
        /// 0 = all clear, no errors
        /// 1 = error, see error message
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
}