using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs;
using PhoneAPI.Services;

namespace PhoneAPI.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHDController : ControllerBase
    {
        private readonly ChiTietHDService CTHDservice;
        public ChiTietHDController(ChiTietHDService CTHDservice)
        {
            this.CTHDservice = CTHDservice;
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
    }
}