using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneAPI.DTOs
{
    public class QuyenDto
    {
        public int permission_id { get; set;}
        public string name { get; set; }
        public string details{get; set;}
        
    }
}