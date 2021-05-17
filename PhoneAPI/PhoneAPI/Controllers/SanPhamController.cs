using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.DTOs.Admin.SanPham;
using PhoneAPI.Models;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        private readonly SanPhamService sanPhamService;
        private readonly LoaiSanPhamService LSPService;
        public SanPhamController(IWebHostEnvironment _env, SanPhamService sanPhamService, LoaiSanPhamService LSPService) {
            this._env = _env;
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

        // =============================== Shop ==============================
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

        // ============================== Index ========================
        [HttpGet("home-spbanchay")]
        public IEnumerable<SanPhamDto> SPBanChay() {
            return this.sanPhamService.TenSPChay();
        }

        [HttpGet("home-sphot")]
        public IEnumerable<SanPhamDto> SPHot() {
            return this.sanPhamService.TenSPNoi();
        }

        // ============================== Admin - SanPham ================================
        // Tìm kiếm bên admin sản phẩm
        [HttpPost("manager_spsearch")]
        public IEnumerable<SanPhamDto> TimKiem(SP_SearchDto q){
            if(String.IsNullOrEmpty(q.input)){
                q.input = "";
            }
            return sanPhamService.SanPhams_AdminTimKiem(q.type, q.input);
        }

        // Khóa trạng thái danh sách sản phẩm theo product_type_id
        [HttpPost("lock_listsp")]
        public void Lock_ListSP(SP_LSP_Status p) {
            this.sanPhamService.SanPham_Update_Status_By_Product_type_id(p.product_type_id, p.status);
        }

        // Thêm ảnh sản phẩm
        // [HttpPost("add_image")]
        // public JsonResult add_Image(SanPhamDto SP) {
        //     try {
        //         var httpRequest = Request.Form;
        //         var postedFile = httpRequest.Files[0];
        //         string filename = postedFile.FileName;
        //         var physicalPath = _env.ContentRootPath + "/Models/" + filename;

        //         using(var stream = new FileStream(physicalPath, FileMode.Create)) {
        //             postedFile.CopyTo(stream);
        //         }

        //         return new JsonResult(filename);
        //     }
        //     catch (Exception)
        //     {
        //         return new JsonResult("none");
        //     }
        // }
    }
}