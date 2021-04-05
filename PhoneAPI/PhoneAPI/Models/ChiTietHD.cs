using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneAPI.Models
{
    public class ChiTietHD
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int bill_id{get; set;}
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int product_id{get; set;}
        public string name {get; set;}
        public int amount { get; set;}
        public long price { get; set;}
        public string img {get; set;}
    }
}