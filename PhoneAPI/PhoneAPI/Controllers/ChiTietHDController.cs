using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.DTOs.CTHD;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHDController : ControllerBase
    {
        private readonly ChiTietHDService CTHDservice;
        private readonly SanPhamService SPService;
        public ChiTietHDController(ChiTietHDService CTHDservice, SanPhamService SPService)
        {
            this.CTHDservice = CTHDservice;
            this.SPService = SPService;
        }

        [HttpGet]
        public IEnumerable<ChiTietHDDto> GetCTHDDtos()
        {
            return CTHDservice.ChiTietHD_GetAll();
        }

        [HttpGet("{bill_id}")]
        public IEnumerable<ChiTietHDDto> GetCTHDDto_ByBillID(int bill_id)
        {
            return CTHDservice.ChiTietHD_GetByBill_Id(bill_id);
        }

        [HttpPost]
        public ActionResult<ChiTietHDDto> AddCTHDDto(ChiTietHDDto q)
        {
            CTHDservice.ChiTietHD_Add(q);

            return q;
        }

        [HttpPost("addRange")]
        public void AddCTHDRange(CTHD_billID_List q)
        {
            
            List<ChiTietHDDto> list = new List<ChiTietHDDto>();
            string[] dauVa = q.list.Split('&');
            int product_id, amount;

            // Load danh sách sản phẩm vào chi tiết hóa đơn
            for(var i = 0; i < dauVa.Length - 1; ++i) {
                string[] dauNgang = dauVa[i].Split('-');

                bool success = int.TryParse(dauNgang[0], out product_id);
                if(success) {
                    success = int.TryParse(dauNgang[1], out amount);
                    if(!success) {
                        continue;
                    }
                }
                else{
                    continue;
                }

                var sp = SPService.SanPham_GetById(product_id);

                // Update số lượng sản phẩm khi đặt hàng
                sp.amount = sp.amount - amount;
                SPService.SanPham_Update(sp);

                var cthd = new ChiTietHDDto();
                cthd.bill_id = q.bill_id;
                cthd.product_id = product_id;
                cthd.name = sp.name;
                cthd.amount = amount;
                cthd.price = sp.price;
                cthd.img = sp.img;

                list.Add(cthd);
            }

            CTHDservice.ChiTietHD_AddRange(list);
        }
    }
}