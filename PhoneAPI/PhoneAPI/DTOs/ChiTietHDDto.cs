using System;
using System.ComponentModel.DataAnnotations;

namespace PhoneAPI.DTOs
{
    public class ChiTietHDDto
    {
        // [Key]
        public int bill_id{get; set;}

        public int product_id{get; set;}

        public string name {get; set;}

        public int amount { get; set;}

        public long price { get; set;}
        
        public string img {get; set;}
        
    }
}