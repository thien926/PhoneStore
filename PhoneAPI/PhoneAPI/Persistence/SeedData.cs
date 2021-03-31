using System.Collections.Generic;
using System.Linq;
using PhoneAPI.Models;

namespace PhoneAPI.Persistence
{
    public class SeedData
    {
        public static void Initialize(PhoneStoreDBContext context) {
            context.Database.EnsureCreated();
            bool temp = false;
            if (!context.KhachHangs.Any()) {
                temp = true;
                context.KhachHangs.AddRange(new List<KhachHang>{
                    new KhachHang{
                        user = "thien",
                        pass = "1234",
                        full_name = "Nguyễn Ngọc Thiện",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Bình Định",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        status = 1
                    },
                    new KhachHang{
                        user = "thinh",
                        pass = "1234",
                        full_name = "Nguyễn Phước Thịnh",
                        phone = "0364117408",
                        mail = "thinh@gmail.com",
                        address = "Hồ Chí Minh",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        status = 1
                    },
                    new KhachHang{
                        user = "cungthien",
                        pass = "1234",
                        full_name = "Cung Xương Hồng Thiên",
                        phone = "0364117408",
                        mail = "thinh@gmail.com",
                        address = "Hồ Chí Minh",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        status = 1
                    }
                });   
            }

            if(!context.LoaiSanPhams.Any()) {
                temp = true;
                context.LoaiSanPhams.AddRange(new List<LoaiSanPham>{
                    new LoaiSanPham{
                        product_type_id =  1,
                        name =  "SAMSUNG",
                        description =  "Foudation set point eye, face, environment"
                    },
                    new LoaiSanPham{
                        product_type_id =  2,
                        name =  "IIPHONE",
                        description =  "Bộ rửa mặt, mặt nạ, dưỡng ẩm, dưỡng môi, chống nắng"
                    },
                    new LoaiSanPham{
                        product_type_id = 3,
                        name =  "OPPO",
                        description =  "Tiêm dưỡng, sữa tắm"
                    },
                    new LoaiSanPham{
                        product_type_id = 4,
                        name =  "VIVO" ,
                        description =  "Dầu gội đầu, dầu xả, tạo kiểu, tóc kiểu"
                    },
                    new LoaiSanPham {
                        product_type_id = 5,
                        name =  "XIAOMI",
                        description =  "Bảo mật và biển"
                    },
                    new LoaiSanPham {
                        product_type_id = 6,
                        name =  "REALMe",
                        description =  "Các loại nước hoa cao cấp tới trung bình"
                    },
                    new LoaiSanPham {
                        product_type_id = 7,
                        name =  "VSMART" ,
                        description =  "Các loại nước hoa cao cấp tới trung bình"
                    },
                    new LoaiSanPham {
                        product_type_id = 8,
                        name =  "ITEL" ,
                        description =  "Các loại nước hoa cao cấp tới trung bình"
                    }
                });  
            }

            if(!context.SanPhams.Any()) {
                temp = true;
                context.SanPhams.AddRange(new List<SanPham>{
                    new SanPham{
                        product_id = 1,
                        product_type_id = 1,
                        name = "Điện thoại Samsung Galaxy S21 Ultra 5G 128GB",
                        amount = 50,
                        price = 15000000,
                        description = "Chip MediaTek Helio G35 8 nhân. RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP. Camera trước: 5 MP.Pin 5000 mAh",
                        img = "sp1.jpg",
                        status = 1
                    }
                });  
            }

            if (temp) {
                context.SaveChanges();
            }
        }
    }
}