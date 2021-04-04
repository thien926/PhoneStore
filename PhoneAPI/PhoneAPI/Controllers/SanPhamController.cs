using System;
using System.Collections.Generic;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Models;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly SanPhamService sanPhamService;
        private readonly LoaiSanPhamService LSPService;
        public SanPhamController(SanPhamService sanPhamService, LoaiSanPhamService LSPService) {
            this.sanPhamService = sanPhamService;
            this.LSPService = LSPService;
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

        // Load bên Shop
        [HttpPost("shop")]
        public ActionResult<IndexViewShopModel> SanPham_Filter(DataShopLoad data) {
            decimal pricemax;
            string NameType;
            int count;
            if(!string.IsNullOrEmpty(data.Type)){
                NameType = LSPService.LoaiSanPham_GetById(int.Parse(data.Type)).name;
                data.qSearch = null;
            }
            else{
                NameType = null;
            }

            var SanPhams = sanPhamService.SanPham_Filter(data.Type, data.qSearch, data.price, data.sort, data.pageIndex, Constants.pageSize, out count, out pricemax);
            var ListSP = new PaginatedList<SanPhamDto>(SanPhams, count, data.pageIndex, Constants.pageSize);
            // Console.WriteLine(ListSP.TotalPages);
            var indexVSM = new IndexViewShopModel()
            {
                ListSP = ListSP,
                Type = data.Type,
                NameType = NameType,
                qSearch = data.qSearch,
                sort = data.sort,
                pricemax = pricemax,
                price = data.price,
                pageSize = Constants.pageSize,
                count = count,
                Range = Constants.Range,
                pageIndex = data.pageIndex,
                TotalPages = ListSP.TotalPages
            };
            return indexVSM;
        }

        [HttpGet("home-spbanchay")]
        public IEnumerable<SanPhamDto> SPBanChay() {
            return this.sanPhamService.TenSPChay();
        }

        [HttpGet("home-sphot")]
        public IEnumerable<SanPhamDto> SPHot() {
            return this.sanPhamService.TenSPNoi();
        }
    }
}