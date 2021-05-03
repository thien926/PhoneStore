
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.DTOs.Admin.LSPDto;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoaiSanPhamController : ControllerBase
    {
        private readonly LoaiSanPhamService LSPservice;
        public LoaiSanPhamController(LoaiSanPhamService LSPservice)
        {
            this.LSPservice = LSPservice;
        }

        [HttpGet]
        public IEnumerable<LoaiSanPhamDto> GetLSPDtos()
        {
            return LSPservice.LoaiSanPham_GetAll();
        }

        [HttpGet("{id}")]
        public LoaiSanPhamDto GetLSPDto(int id)
        {
            return LSPservice.LoaiSanPham_GetById(id);
        }

        [HttpPost]
        public ActionResult<LoaiSanPhamDto> AddLSPDto(LoaiSanPhamDto p)
        {
            LSPservice.LoaiSanPham_Add(p);

            return CreatedAtAction(nameof(GetLSPDto), new { id = p.product_type_id }, p);
        }

        [HttpPut]
        public void UpdateLSPDto([FromBody] LoaiSanPhamDto p)
        {
            LSPservice.LoaiSanPham_Update(p);
        }

        [HttpDelete("{id}")]
        public void DeleteLSPDto(int id)
        {
            LSPservice.LoaiSanPham_Remove(id);
        }
        // Tìm kiếm bên admin loại sản phẩm
        [HttpPost("manager_lspsearch")]
        public IEnumerable<LoaiSanPhamDto> TimKiem(LSP_SearchDto q){
            if(String.IsNullOrEmpty(q.input)){
                q.input = "";
            }
            return LSPservice.LoaiSanPham_AdminTimKiem(q.type, q.input);
        }
    }
}