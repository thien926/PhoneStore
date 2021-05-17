using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly SanPhamService sanPhamService;
        private readonly LoaiSanPhamService LSPService;
        public TestController(SanPhamService sanPhamService, LoaiSanPhamService LSPService) {
            this.sanPhamService = sanPhamService;
            this.LSPService = LSPService;
        }

        [HttpGet]
        public IEnumerable<SanPhamDto> GetSPDtos() {
            return this.sanPhamService.SanPham_GetAll();
        }
    }
}