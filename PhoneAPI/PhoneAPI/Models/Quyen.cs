using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneAPI.Models
{
        
    public class Quyen
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int permission_id {get;set;}

        public string name { get; set; }
        public string details{get; set;}

        
    }
}