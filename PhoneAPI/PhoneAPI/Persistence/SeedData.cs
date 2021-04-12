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
            //Quyen            
            if (!context.Quyens.Any()) {
                temp = true;
                context.Quyens.AddRange(new List<Quyen>{
                    new Quyen{
                        permission_id = 1,
                        name = "Admin",
                        details = "qlNhapHang-qlNhanVien-qlSanPham-qlHoaDon-qlKhachHang-qlPhieuNhap-qlNCC-qlTaiKhoan-qlQuyen-qlThongKe-qlLoaiSanPham"
                    },
                    new Quyen{
                        permission_id = 2,
                        name = "Quản lý",
                        details = "qlNhanVien-xemSanPham-xemHoaDon-qlKhachHang-xemPhieuNhap-xemNCC-qlTaiKhoan-qlThongKe-qlLoaiSanPham"
                    },
                    new Quyen{
                        permission_id = 3,
                        name = "Nhân viên bán hàng",
                        details = "xemSanPham-qlHoaDon-xemKhachHang-qlThongKe"
                    },
                    new Quyen{
                        permission_id = 4,
                        name = "Nhân viên nhập hàng",
                        details = "qlNhapHang-qlSanPham-qlPhieuNhap-qlNCC-qlThongKe-qlLoaiSanPham"
                    }
                });   
            }
            //Chi tiet hd
            if (!context.ChiTietHDs.Any()) {
                temp = true;
                context.ChiTietHDs.AddRange(new List<ChiTietHD>{
                    new ChiTietHD{
                        bill_id = 1,
                        product_id = 1,
                        name = "Điện thoại Samsung Galaxy S21 Ultra 5G 128GB",
                        amount = 1,
                        price = 15000000,
                        img = "sp1.jpg"
                    },
                    new ChiTietHD{
                        bill_id = 2,
                        product_id = 1,
                        name = "Điện thoại Samsung Galaxy S21 Ultra 5G 128GB",
                        amount = 1,
                        price = 15000000,
                        img = "sp1.jpg"
                    },
                    new ChiTietHD{
                        bill_id = 2,
                        product_id = 2,
                        name = "Samsung Galaxy A52 (8GB/256GB)",
                        amount = 1,
                        price = 10290000,
                        img = "sp2.jpg"
                    },
                    new ChiTietHD{
                        bill_id = 3,
                        product_id = 2,
                        name = "Samsung Galaxy A52 (8GB/256GB)",
                        amount = 1,
                        price = 10290000,
                        img = "sp2.jpg"
                    },
                });   
            }
            //Hoa don
            if (!context.HoaDons.Any()) {
                temp = true;
                context.HoaDons.AddRange(new List<HoaDon>{
                    new HoaDon{
                        bill_id = 1,
                        user_kh = "thien",
                        user_nv = "bh01",
                        phone = "0364117408",
                        address = "Bình Định",
                        date_receice = new System.DateTime(2020, 5, 8, 5, 4, 6),
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 15000000,
                        status = 3
                    },
                    new HoaDon{
                        bill_id = 2,
                        user_kh = "thinh",
                        user_nv = "",
                        phone = "0364117408",
                        address = "Miền Tây",
                        date_receice = null,
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 25290000,
                        status = 2
                    },
                    new HoaDon{
                        bill_id = 3,
                        user_kh = "cungthien",
                        user_nv = "",
                        phone = "0364117408",
                        address = "Bình Dương",
                        date_receice = null,
                        date_order = new System.DateTime(2020, 5, 18, 5, 4, 6),
                        total = 10290000,
                        status = 1
                    }
                });   
            }

            //Khach hang
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
            //Nhân viên
            if (!context.NhanViens.Any()) {
                temp = true;
                context.NhanViens.AddRange(new List<NhanVien>{
                    new NhanVien{
                        user = "admin",
                        pass = "admin",
                        full_name = "Nguyễn Ngọc Thiện",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Bình Định",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        permission_id = 1,
                        status = 1
                    },
                    new NhanVien{
                        user = "ql01",
                        pass = "ql01",
                        full_name = "Nguyễn Tấn Thông",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Hồ Chí Minh",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        permission_id = 2,
                        status = 1
                    },
                    new NhanVien{
                        user = "bh02",
                        pass = "bh02",
                        full_name = "Cung Xương Hồng Thiên",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Hồ Chí Minh",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        permission_id = 3,
                        status = 1
                    },
                    new NhanVien{
                        user = "bh01",
                        pass = "bh01",
                        full_name = "Nguyễn Ngọc Thiện",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Hồ Chí Minh",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        permission_id = 3,
                        status = 1
                    },
                    new NhanVien{
                        user = "nh01",
                        pass = "nh01",
                        full_name = "Nguyễn Tuyến Đạt",
                        phone = "0364117408",
                        mail = "tructruong.070202@gmail.com",
                        address = "Hồ Chí Minh",
                        sex = "Nam",
                        dateborn = new System.DateTime(2000, 5, 8),
                        permission_id = 4,
                        status = 1
                    }
                });   
            }
            //loai san pham
            if(!context.LoaiSanPhams.Any()) {
                temp = true;
                context.LoaiSanPhams.AddRange(new List<LoaiSanPham>{
                    new LoaiSanPham{
                        product_type_id =  1,
                        name =  "SAMSUNG",
                        description =  "SAMSUNG"
                    },
                    new LoaiSanPham{
                        product_type_id =  2,
                        name =  "IIPHONE",
                        description =   "IIPHONE"
                    },
                    new LoaiSanPham{
                        product_type_id = 3,
                        name =  "OPPO",
                        description =  "OPPO"
                    },
                    new LoaiSanPham{
                        product_type_id = 4,
                        name =  "VIVO" ,
                        description =  "VIVO"
                    },
                    new LoaiSanPham {
                        product_type_id = 5,
                        name =  "XIAOMI",
                        description =  "XIAOMI"
                    },
                    new LoaiSanPham {
                        product_type_id = 6,
                        name =  "REALMe",
                        description =  "REALMe"
                    },
                    new LoaiSanPham {
                        product_type_id = 7,
                        name =  "VSMART" ,
                        description =  "VSMART"
                    }
                });  
            }
            //sản phẩm
            if(!context.SanPhams.Any()) {
                temp = true;
                context.SanPhams.AddRange(new List<SanPham>{
                    new SanPham{
                    product_id =1,
                        name="Điện thoại Samsung Galaxy S21 Ultra 5G 128GB",
                        product_type_id=1,
                        amount=50,
                        price=15000000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp1.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =2,
                        name="Samsung Galaxy A52 (8GB/256GB)",
                        product_type_id=1,
                        amount=50,
                        price=10290000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp2.jpg",
                        status=1 
                    },
                    new SanPham{
                    product_id =3,
                        name="Samsung Galaxy Z Fold2 5G",
                        product_type_id=1,
                        amount=50,
                        price=50000000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp3.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =4,
                        name="Samsung Galaxy S21 Ultra 5G 256GB",
                        product_type_id=1,
                        amount=50,
                        price=37500000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp4.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =5,
                        name="Samsung Galaxy Note 20 Ultra 5G",
                        product_type_id=1,
                        amount=50,
                        price=23990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp5.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =6,
                        name="Samsung Galaxy Note 20 Ultra 5G Trắng",
                        product_type_id=1,
                        amount=50,
                        price=23900000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp6.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =7,
                        name="Samsung Galaxy Note 20 Ultra",
                        product_type_id=1,
                        amount=50,
                        price=21990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp7.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =8,
                        name="Samsung Galaxy S21+ 5G 256GB",
                        product_type_id=1,
                        amount=50,
                        price=28900000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp8.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =9,
                        name="Samsung Galaxy S21+ 5G 128GB",
                        product_type_id=1,
                        amount=50,
                        price=2599000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp9.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =10,
                        name="Samsung Galaxy Note 20",
                        product_type_id=1,
                        amount=50,
                        price=16990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp10.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =11,
                        name="Samsung Galaxy S21 5G",
                        product_type_id=1,
                        amount=50,
                        price=20990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp11.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =12,
                        name="Samsung Galaxy Note 10+",
                        product_type_id=1,
                        amount=50,
                        price=16940000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp12.jpg",
                        status=1  
                    },
                    new SanPham{
                    product_id =13,
                        name="iPhone XR 128GB",
                        product_type_id=2,
                        amount=50,
                        price=16490000  ,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp13.jpg",
                        status=1  
                        
                    },
                    new SanPham{
                    product_id =14,
                        name="iPhone SE 128GB (2020) (Hộp mới)",
                        product_type_id=2,
                        amount=5,
                        price=11790000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp14.jpg  ",
                        status=1            
                    },
                    new SanPham{
                    product_id =15,
                        name="iPhone SE 64GB (2020) (Hộp mới)",
                        product_type_id=2,
                        amount=50,
                        price=10490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp15.jpg"   ,
                        status=1           
                    },
                    new SanPham{
                    product_id =16,
                        name="iPhone 12 Pro Max 512GB",
                        product_type_id=2,
                        amount=50,
                        price=40990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp16.jpg " ,
                        status=1           
                    },
                    new SanPham{
                    product_id =17,
                        name="iPhone 12 Pro Max 256GB",
                        product_type_id=2,
                        amount=50,
                        price=36490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp17.jpg",
                        status=1  
                                
                    },
                    new SanPham{
                    product_id =18,
                        name="iPhone 12 mini 64GB",
                        product_type_id=2,
                        amount=50,
                        price=20590000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp18.jpg",
                        status=1  
                                    
                    },
                    new SanPham{
                    product_id =19,
                        name="iPhone 12 mini 256GB",
                        product_type_id=2,
                        amount=50,
                        price=37990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp19.jpg  ",
                        status=1            
                    },
                    new SanPham{
                    product_id =20,
                        name="iPhone 12 Pro 512GB",
                        product_type_id=2,
                        amount=50,
                        price=27490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp20.jpg" , 
                        status=1            
                    },
                    new SanPham{
                    product_id =21,
                        name="iPhone 12 256GB",
                        product_type_id=2,
                        amount=50,
                        price=24990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp21.jpg",  
                        status=1           
                    },
                    new SanPham{
                    product_id =22,
                        name="iPhone 12 128GB",
                        product_type_id=2,
                        amount=50,
                        price=1879000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp22.jpg " ,
                        status=1           
                    },
                    new SanPham{
                    product_id =23,
                        name="iPhone 12 mini 64GB",
                        product_type_id=2,
                        amount=50,
                        price=18790000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp23.jpg " ,
                        status=1            
                    },
                    new SanPham{
                    product_id =24,
                        name="iPhone SE 256GB (2020)",
                        product_type_id=2,
                        amount=50,
                        price=14490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp24.jpg " ,
                        status=1            
                    },
            
                    new SanPham{
                    product_id =25,
                        name="OPPO A94",
                        product_type_id=3,
                        amount=5,
                        price=7690000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp25.jpg" , 
                        status=1          
                    },
                    new SanPham{
                    product_id =26,
                        name="OPPO Reno5 Marvel",
                        product_type_id=3,
                        amount=50,
                        price=9600000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp26.jpg"   ,
                        status=1          
                    },
                    new SanPham{
                    product_id =27,
                        name="OPPO A15s",
                        product_type_id=3,
                        amount=50,
                        price=3990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp27.jpg" , 
                        status=1           
                    },
                    new SanPham{
                    product_id =28,
                        name="OPPO Reno5 5G",
                        product_type_id=3,
                        amount=50,
                        price=11990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp28.jpg" ,
                        status=1           
                    },
                    new SanPham{
                    product_id =29,
                        name="OPPO Reno5",
                        product_type_id=3,
                        amount=50,
                        price=8690000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp29.jpg"  ,
                        status=1           
                    },
                    new SanPham{
                    product_id =30,
                        name="OPPO A15",
                        product_type_id=3,
                        amount=50,
                        price=3490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp30.jpg " , 
                        status=1          
                    },
                    new SanPham{
                    product_id =31,
                        name="OPPO A93",
                        product_type_id=3,
                        amount=50,
                        price=6490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp31.jpg" , 
                        status=1            
                    },
                    new SanPham{
                    product_id =32,
                        name="OPPO A53 (2020)",
                        product_type_id=3,
                        amount=50,
                        price=4490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp32.jpg",    
                        status=1         
                    },
                    new SanPham{
                    product_id =33,
                        name="OPPO Reno4 Pro",
                        product_type_id=3,
                        amount=50,
                        price=10990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp33.jpg" ,
                        status=1            
                    },
                    new SanPham{
                    product_id =34,
                        name="OPPO Reno4 Pro",
                        product_type_id=3,
                        amount=50,
                        price=7490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp34.jpg" , 
                        status=1           
                    },
                    new SanPham{
                    product_id =35,
                        name="OPPO Reno3 Pro",
                        product_type_id=3,
                        amount=50,
                        price=7990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp35.jpg" , 
                        status=1           
                    },
                    new SanPham{
                    product_id =36,
                        name="OPPO A92",
                        product_type_id=3,
                        amount=50,
                        price=6190000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp36.jpg"  ,  
                        status=1         
                    },
                    new SanPham{
                    product_id =37,
                        name="Vivo Y51 (2020)",
                        product_type_id=4,
                        amount=50,
                        price=5590000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp37.jpg",
                        status=1  
                                    
                    },
                    new SanPham{
                    product_id =38,
                        name="Vivo V20 (2021)",
                        product_type_id=4,
                        amount=50,
                        price=7790000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp38.jpg",
                        status=1  
                                    
                    },
                    new SanPham{
                    product_id =39,
                        name="Vivo Y12s (4GB/128GB)",
                        product_type_id=4,
                        amount=50,
                        price=3790000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp39.jpg" , 
                        status=1            
                    },
                    new SanPham{
                    product_id =40,
                        name="Vivo Y12s (3GB/32GB)",
                        product_type_id=4,
                        amount=50,
                        price=2990000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp40.jpg" ,   
                        status=1         
                    },
                    new SanPham{
                    product_id =41,
                        name="Vivo V20",
                        product_type_id=4,
                        amount=50,
                        price=7790000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp41.jpg "  ,
                        status=1          
                    },
                    new SanPham{
                    product_id =42,
                        name="Vivo Y20s",
                        product_type_id=4,
                        amount=50,
                        price=4490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp42.jpg" ,  
                        status=1          
                    },
                    new SanPham{
                    product_id =43,
                        name="Vivo V20 SE",
                        product_type_id=4,
                        amount=50,
                        price=6490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp43.jpg ",
                        status=1            
                    },
                    new SanPham{
                    product_id =44,
                        name="Vivo Y20",
                        product_type_id=4,
                        amount=50,
                        price=3790000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp44.jpg" , 
                        status=1            
                    },
                    new SanPham{
                    product_id =45,
                        name="Vivo Y1s",
                        product_type_id=4,
                        amount=50,
                        price=2350000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp45.jpg" , 
                        status=1            
                    },
                    new SanPham{
                    product_id =46,
                        name="Vivo Y30",
                        product_type_id=4,
                        amount=50,
                        price=3690000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp46.jpg" , 
                        status=1            
                    },
                    new SanPham{
                        product_id =47,
                        name="Vivo V19 Neo",
                        product_type_id=4,
                        amount=50,
                        price=6490000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp47.jpg" ,   
                        status=1          
                    },
                    new SanPham{
                    product_id =48,
                        name="Vivo Y50",
                        product_type_id=4,
                        amount=50,
                        price=5049000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp48.jpg" ,
                        status=1             
                    },
                    new SanPham{
                        product_id =49,
                        name="Xiaomi Redmi Note 10 (6GB/128GB)",
                        product_type_id=5,
                        amount=50,
                        price=5490000,
                        description="6.43, Chip Snapdragon 678 8 nhân.RAM 6 GB, ROM 128 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp49.jpg",
                        status=1           
                    },
                    new SanPham{
                        product_id =50,
                        name="Xiaomi Mi 11 5G",
                        product_type_id=5,
                        amount=50,
                        price=21990000,
                        description=  "6.81, Chip Snapdragon 888 8 nhân.RAM 8 GB, ROM 256 GB.Camera sau: Chính 108 MP & Phụ 13 MP, 5 MP.Camera trước: 20 MP.Pin 4600 mAh, Có sạc nhanh",
                        img="sp50.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =51,
                        name="Xiaomi Mi 10T Pro 5G",
                        product_type_id=5,
                        amount=50,
                        price=12990000,
                        description=  "6.67, Chip Snapdragon 865 8 nhân.RAM 8 GB, ROM 256 GB.Camera sau: Chính 108 MP & Phụ 13 MP, 5 MP.Camera trước: 20 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp51.jpg",
                        status=1           
                    },
                    new SanPham{
                        product_id =52,
                        name="Xiaomi Redmi Note 10 Pro (8GB/128GB)",
                        product_type_id=5,
                        amount=50,
                        price=7499000,
                        description= " 6.67, Chip Snapdragon 732G 8 nhân.RAM 8 GB, ROM 128 GB.Camera sau: Chính 108 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 16 MP.Pin 5020 mAh, Có sạc nhanh",
                        img="sp52.jpg",
                        status=1            
                    },
                    new SanPham{
                        product_id =53,
                        name="Xiaomi POCO X3 NFC",
                        product_type_id=5,
                        amount=50,
                        price=5990000,
                        description= " 6.67, Chip Snapdragon 732G 8 nhân.RAM 6 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 13 MP, 2 MP, 2 MP.Camera trước: 20 MP.Pin 5160 mAh, Có sạc nhanh",
                        img="sp53.jpg",
                        status=1           
                    },
                    new SanPham{
                        product_id =54,
                        name="Xiaomi Redmi Note 10 Pro (6GB/128GB)",
                        product_type_id=5,
                        amount=50,
                        price=6990000,
                        description=  "6.67, Chip Snapdragon 732G 8 nhân.RAM 6 GB, ROM 128 GB.Camera sau: Chính 108 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 16 MP.Pin 5020 mAh, Có sạc nhanh",
                        img="sp54.jpg",
                        status=1            
                    },
                    new SanPham{
                        product_id =55,
                        name="Xiaomi Redmi Note 9 Pro (6GB/128GB)",
                        product_type_id=5,
                        amount=50,
                        price=6490000,
                        description=  "6.67, Chip Snapdragon 720G 8 nhân.RAM 6 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 16 MP.Pin 5020 mAh, Có sạc nhanh",
                        img="sp55.jpg",
                        status=1            
                    },
                    new SanPham{
                        product_id =56,
                        name="Xiaomi Redmi Note 9 Pro (6GB/64GB)",
                        amount=50,
                        price=5990000,
                        description=  "6.67, Chip Snapdragon 720G 8 nhân.v.Camera sau: Chính 64 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 16 MP.Pin 5020 mAh, Có sạc nhanh",
                        img="sp56.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =57,
                        name="Xiaomi Redmi Note 9S",
                        product_type_id=5,
                        amount=50,
                        price=5690000,
                        description=  "6.67, Chip Snapdragon 720G 8 nhân.RAM 6 GB, ROM 128 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 16 MP.Pin 5020 mAh, Có sạc nhanh",
                        img="sp57.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =58,
                        name="Xiaomi Redmi 9T (6GB/128GB)",
                        product_type_id=5,
                        amount=50,
                        price=4690000,
                        description=  "6.53, Chip Snapdragon 662 8 nhân.RAM 6 GB, ROM 128 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 8 MP.Pin 6000 mAh, Có sạc nhanh",
                        img="sp58.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =59,
                        name="Xiaomi Redmi Note 9",
                        product_type_id=5,
                        amount=50,
                        price=4190000,
                        description=  "6.53, Chip MediaTek Helio G85 8 nhân.RAM 4 GB, ROM 128 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 13 MP.Pin 5020 mAh, Có sạc nhanh",
                        img="sp59.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =60,
                        name="Xiaomi Redmi Note 10 (4GB/64GB)",
                        product_type_id=5,
                        amount=50,
                        price=4690000,
                        description=  "6.43, Chip Snapdragon 678 8 nhân.RAM 4 GB, ROM 64 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp60.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =63,
                        name="Realme C15",
                        product_type_id=6,
                        amount=50,
                        price=3750000,
                        description=  "6.5, Chip Snapdragon 460 8 nhân.RAM 4 GB, ROM 64 GB.Camera sau: Chính 13 & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 8 MP.Pin 6000 mAh, Có sạc nhanh",
                        img="sp63.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =64,
                        name="Realme 7",
                        product_type_id=6,
                        amount=50,
                        price=6990000,
                        description=  "6.5, Chip MediaTek Helio G95 8 nhân.RAM 8 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 16 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp64.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =65,
                        name="Realme 7 Pro",
                        product_type_id=6,
                        amount=50,
                        price=8490000,
                        description=  "6.4, Chip Snapdragon 720G 8 nhân.RAM 8 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 32 MP.Pin 4500 mAh, Có sạc nhanh",
                        img="sp65.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =66,
                        name="Realme 7i",
                        product_type_id=6,
                        amount=50,
                        price=6290000,
                        description= " 6.5, Chip Snapdragon 662 8 nhân.RAM 8 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 16 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp66.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =67,
                        name="Realme C12",
                        product_type_id=6,
                        amount=50,
                        price=3490000,
                        description=  "6.52, Chip MediaTek Helio G35 8 nhân.RAM 3 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP, 2 MP.Camera trước: 5 MP.Pin 6000 mAh",
                        img="sp67.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =68,
                        name="Realme C11",
                        product_type_id=6,
                        amount=50,
                        price=2590000,
                        description=  "6.5, Chip MediaTek Helio G35 8 nhân.RAM 2 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp68.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =69,
                        name="Realme 6i",
                        product_type_id=6,
                        amount=50,
                        price=4690000,
                        description=  "6.5, Chip MediaTek Helio G80 8 nhân.RAM 4 GB, ROM 128 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 16 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp69.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =70,
                        name="Realme 6 Pro",
                        product_type_id=6,
                        amount=50,
                        price=6990000,
                        description=  "6.6, Chip Snapdragon 720G 8 nhân.RAM 8 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 12 MP, 8 MP, 2 MP.Camera trước: Chính 16 MP & Phụ 8 MP.Pin 4300 mAh, Có sạc nhanh",
                        img="sp70.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =71,
                        name="Realme 6 (4GB/128GB)",
                        product_type_id=6,
                        amount=50,
                        price=5490000,
                        description=  "6.5, Chip MediaTek Helio G90T 8 nhân.RAM 4 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 16 MP.Pin 4300 mAh, Có sạc nhanh",
                        img="sp71.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =72,
                        name="Realme C3 (3GB/32GB)",
                        product_type_id=6,
                        amount=50,
                        price=2790000,
                        description="RAM 3 GB, ROM 32 GB.Camera sau: Chính 12 MP & Phụ 2 MP, 2 MP.Camera trước: 5 MP.Pin 5000 mAh",
                        img="sp72.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =73,
                        name="Vsmart Star 5 (3GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=2890000,
                        description=  "6.52, Chip MediaTek Helio G35 8 nhân.RAM 3 GB, ROM 64 GB.Camera sau: Chính 13 MP & Phụ 2 MP, 2 MP.Camera trước: 8 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp73.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =74,
                        name="Vsmart Aris Pro",
                        product_type_id=7,
                        amount=50,
                        price=8459000,
                        description="Vsmart Aris Pro.RAM 8 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 8 MP, 2 MP.Camera trước: 20 MP.Pin 4000 mAh, Có sạc nhanh",
                        img="sp74.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =75,
                        name="Vsmart Aris (8GB/128GB)",
                        product_type_id=7,
                        amount=50,
                        price=6690000,
                        description=  "6.39, Chip Snapdragon 730 8 nhân.RAM 8 GB, ROM 128 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 8 MP, 2 MP.Camera trước: 20 MP.Pin 4000 mAh, Có sạc nhanh",
                        img="sp75.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =76,
                        name="Vsmart Aris (6GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=5990000,
                        description=  "6.39, Chip Snapdragon 730 8 nhân.RAM 6 GB, ROM 64 GB.Camera sau: Chính 64 MP & Phụ 8 MP, 8 MP, 2 MP.Camera trước: 20 MP.<span>Pin 4000 mAh, Có sạc nhanh",
                        img="sp76.jpg",
                        status=1
                                    
                    },
                    new SanPham{
                    product_id =77,
                        name="Vsmart Live 4 6GB",
                        product_type_id=7,
                        amount=50,
                        price=4290000,
                        description=  "6.5, Chip Snapdragon 675 8 nhân.RAM 6 GB, ROM 64 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp77.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =78,
                        name="Vsmart Live 4 4GB",
                        product_type_id=7,
                        amount=50,
                        price=4090000,
                        description=  "6.5, Chip Snapdragon 675 8 nhân.RAM 4 GB, ROM 64 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 5 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp78.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =79,
                        name="Vsmart Joy 4 (6GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=3990000,
                        description=  "6.53, Chip Snapdragon 665 8 nhân.RAM 6 GB, ROM 64 GB.Camera sau: Chính 16 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp79.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =80,
                        name="Vsmart Joy 4 (4GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=3559000,
                        description=  "6.53, Chip Snapdragon 665 8 nhân.RAM 4 GB, ROM 64 GB.Camera sau: Chính 16 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp80.jpg",
                        status=1            
                    },
                    new SanPham{
                    product_id =81,
                        name="Vsmart Joy 3 (4GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=3290000,
                        description=  "6.5, Chip Snapdragon 632 8 nhân.RAM 4 GB, ROM 64 GB.Camera sau: Chính 13 MP & Phụ 8 MP, 2 MP.Camera trước: 8 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp81.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =82,
                        name="Vsmart Joy 4 (3GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=3290000,
                        description=  "6.53, Chip Snapdragon 665 8 nhân.RAM 3 GB, ROM 64 GB.Camera sau: Chính 16 MP & Phụ 8 MP, 2 MP, 2 MP.Camera trước: 13 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp82.jpg",
                        status=1           
                    },
                    new SanPham{
                    product_id =83,
                        name="Vsmart Star 5 (3GB/32GB)",
                        product_type_id=7,
                        amount=50,
                        price=2690000,
                        description="6.52, Chip MediaTek Helio G35 8 nhân.RAM 3 GB, ROM 32 GB.Camera sau: Chính 13 MP & Phụ 2 MP, 2 MP.Camera trước: 8 MP.Pin 5000 mAh, Có sạc nhanh",
                        img="sp83.jpg",
                        status=1               
                    },
                    new SanPham{
                    product_id =84,
                        name="Vsmart Active 3 (6GB/64GB)",
                        product_type_id=7,
                        amount=50,
                        price=3899000,
                        description= "6.39, Chip MediaTek Helio P60 8 nhân.RAM 6 GB, ROM 64 GB.Camera sau: Chính 48 MP & Phụ 8 MP, 2 MP.Camera trước: 16 MP.Pin 4020 mAh, Có sạc nhanh",
                        img="sp84.jpg",
                        status=1          
                    },
                });  
            }

            if (temp) {
                context.SaveChanges();
            }
        }
    }
}