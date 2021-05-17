using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PhoneAPI.DTOs.Admin.SanPham;

namespace PhoneAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        public ImageUploadController(IWebHostEnvironment _env) {
            this._env = _env;
        }
        [HttpGet]
        public FileUPloadAPI LoadGet () {
            return new FileUPloadAPI();
        }

        // Thêm ảnh sản phẩm
        [HttpPost]
        public async Task<string> Post () {
            try {
                // Console.WriteLine("Count: " + HttpContext.Request);
                var file = Request.Form.Files[0];
                Console.WriteLine("File: " + file);
                if(file.Length > 0) {
                    if(!Directory.Exists(_env.WebRootPath + "\\img\\")) {
                        Directory.CreateDirectory(_env.WebRootPath + "\\img\\");
                    }

                    using (FileStream fileStream  = System.IO.File.Create(_env.WebRootPath + "\\img\\" + file.FileName)) {
                        file.CopyTo(fileStream);
                        fileStream.Flush();
                        return ("Success");
                    }
                }
                else {
                    Console.WriteLine("null 1");
                    return null;
                }
            }
            catch (Exception)
            {
                Console.WriteLine("null 2");
                return null;
            }
        }

        // Thêm ảnh sản phẩm
        // [HttpPost]
        // public async Task<string> Post (IFormFile file) {
        //     try {
        //         var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img", file.Name);
        //         var stream = new FileStream(path, FileMode.Create);
        //         file.CopyToAsync(stream);
        //         return "ok";
        //     }
        //     catch (Exception)
        //     {
        //         Console.WriteLine("null 2");
        //         return null;
        //     }
        // }
    }
}