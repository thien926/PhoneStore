// LoadCartForLayOut();
// function LoadCartForLayOut() {
//     $.ajax({
//         url: '/Home/LoadCartForLayOut',
//         type: "POST",
//         dataType: "json",
//         data: {
//         },
//         success: function (data) {
//             var s = "";
//             var total = 0;
//             var totalsoluong = 0;
//             if (data != null) {
//                 for (var i = 0; i < data.length; ++i) {
//                     totalsoluong += data[i].soluong;
//                     total += parseInt(data[i].sp.price) * parseInt(data[i].soluong);
//                     s += `<tr>
//                         <td class="si-pic"><img src="`+ data[i].sp.img + `" alt=""></td>
//                         <td class="si-text">
//                             <div class="product-selected">
//                                 <p>`+ data[i].sp.price + ` x ` + data[i].soluong + `</p>
//                                 <h6>`+ data[i].sp.name + `</h6>
//                             </div>
//                         </td>
//                         <td class="si-close">
//                             <i class="ti-close" onclick = "AjaxRemoveSP(`+ data[i].sp.product_id +`)"></i>
//                         </td>
//                     </tr>`;
//                 }
//                 s = '<tbody>' + s + '</tbody>';
//                 document.getElementById("loadcartlayout").innerHTML = s;
//                 s = `<span>Tổng:</span>
//                             <h5>`+ total + ` đ</h5>`;
//                 document.getElementById("loadtotalcartlayout").innerHTML = s;
//                 s = `<i class="icon_bag_alt"></i>
//                             <span>`+ totalsoluong + ` đ</span>`;
//                 document.getElementById("suatotalsoluongdonhanglayout").innerHTML = s;
//                 document.getElementById("totalpricelayout").innerHTML = total + " đ";
//             }
//         },
//         error: function (e) {
//             alert(e.responseText);
//         }
//     });
// }

// function AjaxRemoveSP(idsp){
//     $.ajax({
//         url : "/Home/AjaxRemoveSP",
//         type : "POST",
//         dataType: "json",
//         data: {
//             idsp: idsp
//         },
//         success: function (data) {
//             var s = "";
//             var total = 0;
//             var totalsoluong = 0;
//             if (data != null) {
//                 for (var i = 0; i < data.length; ++i) {
//                     totalsoluong += data[i].soluong;
//                     total += parseInt(data[i].sp.price) * parseInt(data[i].soluong);
//                     s += `<tr>
//                         <td class="si-pic"><img src="`+ data[i].sp.img + `" alt=""></td>
//                         <td class="si-text">
//                             <div class="product-selected">
//                                 <p>`+ data[i].sp.price + ` x ` + data[i].soluong + `</p>
//                                 <h6>`+ data[i].sp.name + `</h6>
//                             </div>
//                         </td>
//                         <td class="si-close">
//                             <i class="ti-close"></i>
//                         </td>
//                     </tr>`;
//                 }
//                 s = '<tbody>' + s + '</tbody>';
//                 document.getElementById("loadcartlayout").innerHTML = s;
//                 s = `<span>Tổng:</span>
//                             <h5>`+ total + ` đ</h5>`;
//                 document.getElementById("loadtotalcartlayout").innerHTML = s;
//                 s = `<i class="icon_bag_alt"></i>
//                             <span>`+ totalsoluong + ` đ</span>`;
//                 document.getElementById("suatotalsoluongdonhanglayout").innerHTML = s;
//                 document.getElementById("totalpricelayout").innerHTML = total + " đ";
//             }
//         },
//         error: function (e) {
//             alert(e.responseText);
//         }
//     });
// }