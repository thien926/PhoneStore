using Microsoft.AspNetCore.Http;

namespace PhoneAPI.DTOs.Admin.SanPham
{
    public class FileUPloadAPI
    {
        public IFormFile files { get; set; }
    }
}