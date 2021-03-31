using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhoneAPI.Models
{
    public class SanPham
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int product_id{get; set;}
        public int product_type_id {get; set;}

        public string name {get; set;}

        public int amount {get; set;}

        public long price {get; set;}

        public string description {get; set;}
        public string img {get; set;}

        public int status {get; set;}

        public virtual LoaiSanPham loaisanpham {get; set;}

        public SanPham(){
            amount = 0;
            status = 1;
        }
    }
}