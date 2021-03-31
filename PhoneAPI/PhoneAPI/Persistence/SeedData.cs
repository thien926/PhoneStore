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


            if (temp) {
                context.SaveChanges();
            }
        }
    }
}