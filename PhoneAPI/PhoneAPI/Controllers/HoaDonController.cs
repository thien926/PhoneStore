using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;
using System.Text.Json;
using PhoneAPI.DTOs.Admin.HoaDon;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonController : ControllerBase
    {
        private readonly HoaDonService HDservice;
        private readonly ChiTietHDService CTHDservice;
        private readonly SanPhamService SPService;
        public HoaDonController(HoaDonService HDservice, ChiTietHDService CTHDservice, SanPhamService SPService)
        {
            this.HDservice = HDservice;
            this.CTHDservice = CTHDservice;
            this.SPService = SPService;
        }

        [HttpGet]
        public IEnumerable<HoaDonDto> GetQDtos()
        {
            return HDservice.HoaDon_GetAll();
        }

        [HttpGet("{id}")]
        public HoaDonDto GetQDto(int id)
        {
            return HDservice.HoaDon_GetById(id);
        }

        [HttpPost]
        public ActionResult<HoaDonDto> AddQDto(HoaDonDto q)
        {
            HDservice.HoaDon_Add(q);

            return CreatedAtAction(nameof(GetQDto), new { id = q.bill_id }, q);
        }

        [HttpPut]
        public void UpdateQDto([FromBody] HoaDonDto q)
        {
            HDservice.HoaDon_Update(q);
        }

        [HttpDelete("{id}")]
        public void DeleteQDto(int id)
        {
            HDservice.HoaDon_Remove(id);
        }
        // Tìm kiếm Hóa Đơn cho admin
        [HttpPost("manager_billsearch")]
        public IEnumerable<HoaDonDto> HoaDonDto_Manager_Search(HoaDon_SearchDto q)
        {
           return HDservice.HoaDon_Manager_TimKiem(q.type, q.input, q.status);
        }

        // Sửa trạng thái hóa đơn
        [HttpPost("manager_billrepaire")]
        public HoaDonDto HoaDonDto_Manager_Repaire(HoaDon_Status hoadon)
        {
            if(hoadon != null) {
                var hd = HDservice.HoaDon_GetById(hoadon.bill_id);
                hd.status = hoadon.status;
                HDservice.HoaDon_Update(hd);

                // Trường hợp hóa đơn bị hủy thì update số lượng sản phẩm
                if(hoadon.status == 4) {
                    var cthd = CTHDservice.ChiTietHD_GetByBill_Id(hd.bill_id);
                    foreach (var item in cthd)
                    {
                        var sp = SPService.SanPham_GetById(item.product_id);
                        sp.amount = sp.amount + item.amount;
                        SPService.SanPham_Update(sp);
                    }
                }
                return hd;
            }

            return null;
        }
    }
}