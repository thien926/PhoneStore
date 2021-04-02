using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly SanPhamService sanPhamService;
        public SanPhamController(SanPhamService sanPhamService) {
            this.sanPhamService = sanPhamService;
        }

        [HttpGet]
        public IEnumerable<SanPhamDto> GetSPDtos() {
            return this.sanPhamService.SanPham_GetAll();
        }

        [HttpGet("{id}")]
        public SanPhamDto GetSPDto(int id) {
            return this.sanPhamService.SanPham_GetById(id);
        }

        [HttpPost]
        public ActionResult<SanPhamDto> AddSPDto(SanPhamDto SP) {
            this.sanPhamService.SanPham_Add(SP);

            return CreatedAtAction(nameof(GetSPDto), new { id = SP.product_id }, SP);
        }

        [HttpPut]
        public void UpdateSPDto([FromBody] SanPhamDto SP) {
            sanPhamService.SanPham_Update(SP);
        }

        [HttpDelete("{id}")]
        public void DeleteSPDto(int id) {
            sanPhamService.SanPham_Remove(id);
        }
    }
}