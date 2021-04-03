using Infrastructure;
using PhoneAPI.DTOs;

namespace PhoneAPI.Models
{
    public class IndexViewShopModel
    {
        public PaginatedList<SanPhamDto> ListSP { get; set; }
        public string Type { get; set; }
        public string NameType { get; set;}
        public string qSearch { get; set; }
        public string sort { get; set;}
        public decimal pricemax { get; set;}
        public string price{ get; set; }
        // Kích thước của 1 trang có bao nhiêu sản phẩm
        public int pageSize { get; set; }
        public int count { get; set; }
        // Số phân trang cần hiện
        public int Range {get; set;}
        public int TotalPages { get; set; }
        public int pageIndex{ get; set; }
    }
}