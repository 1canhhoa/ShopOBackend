// const img2710_1= require("~/public/images/2710_1.jpeg");
// const img2710_2= require("~/public/images/2710_2.jpeg");
// const img2805_1= require("~/public/images/2805_1.jpeg");
// const img2805_2= require("~/public/images/2805_2.jpeg");
// const img2706_1= require("~/public/images/2706_1.jpeg");
// const img2706_2= require("~/public/images/2706_2.png");
// const img2707_1= require("~/public/images/2707_1.png");
// const img2707_2= require("~/public/images/2707_2.png");
// const img2708_1= require("~/public/images/2708_1.png");
// const img2708_2= require("~/public/images/2708_2.png");
// const img2830_1= require("~/public/images/2830_1.jpeg");
// const img2830_2= require("~/public/images/2830_2.jpeg");
// const img2833_1= require("~/public/images/2833_1.png");
// const img2833_2= require("~/public/images/2833_2.jpeg");
// const img2853_1= require("~/public/images/2853_1.png");
// const img2853_2= require("~/public/images/2853_2.jpeg");

// const productsData = [
//   {
//     id: 2710,
//     image: [
//       { key: "product4", src: img2710_1, alt: "product4", fill: true },
//       { key: "product3", src: img2710_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       "Thủ công và Tốn Thời Gian", "Khả Năng Đồng Bộ Hóa Thấp", "Khó Khăn Trong Giao Tiếp", "Thiếu Tính Minh Bạch", "Khả Năng Tương Tác Hạn Chế", "Thách Thức Trong Quản Lý Đào Tạo"
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "HỆ THỐNG QUẢN LÝ GIÁO DỤC THÔNG MINH SMART EDUCATION",
//   },
//   {
//     id: 2805,
//     image: [
//       { key: "product4", src: img2805_1, alt: "product4", fill: true },
//       { key: "product3", src: img2805_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       "Hạn Chế Trong Việc Tiếp Cận Tài Nguyên Học Tập", "Thiếu Tính Tương Tác và Thực Hành", "Khó Khăn Trong Quản Lý Tiến Trình Học Tập", "Thiếu Tính Linh Hoạt", "Khả Năng Tiếp Cận Hạn Chế"
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "METALEARN"
//   },
//   {
//     id: 2706,
//     image: [
//       { key: "product4", src: img2706_1, alt: "product4", fill: true },
//       { key: "product3", src: img2706_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       "Quá Trình Giao Tiếp Thủ Công", "Rủi Ro Mất Mát Thông Tin và Bảo Mật", "Khả Năng Xử Lý Thông Tin Chậm:", "Hạn Chế Trong Việc Theo Dõi Lịch Trình"
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "Hệ điều hành doanh nghiệp SmartWork"
//   },
//   {
//     id: 2707,
//     image: [
//       { key: "product4", src: img2707_1, alt: "product4", fill: true },
//       { key: "product3", src: img2707_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       'Ghi Chép Thủ Công',
//       'Khả Năng Đồng Bộ Hóa Hạn Chế',
//       'Thời Gian Tìm Kiếm và Tra Cứu Tăng',
//       'Khả Năng Theo Dõi Hiệu Suất Kém',
//       'Quản Lý Thời Gian và Lịch Trình Không Linh Hoạt',
//       'Rủi Ro Mất Mát và Thất Lạc'
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "Hệ thống quản lý sản xuất",
//   },
//   {
//     id: 2708,
//     image: [
//       { key: "product4", src: img2708_1, alt: "product4", fill: true },
//       { key: "product3", src: img2708_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       'Quản Lý Giấy Tờ Thủ Công',
//       'Khả Năng Đồng Bộ Hóa Hạn Chế',
//       'Thời Gian Tìm Kiếm và Tra Cứu Tăng',
//       'Không Đồng Bộ Hóa Thông Tin',
//       'Rủi Ro Bảo Mật Thông Tin',
//       'Quản Lý Không Linh Hoạt'
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "HỆ THỐNG QUẢN LÝ CÔNG VĂN VÀ VĂN BẢN EDMS",
//   },
//   {
//     id: 2830,
//     image: [
//       { key: "product4", src: img2830_1, alt: "product4", fill: true },
//       { key: "product3", src: img2830_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       'nhập exel dễ nhầm lẫn',
//       'tốc độ chậm',
//       'nội dung không được quản lý chặt chẽ',
//       'giảm tốc độ khi làm việc chung',
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "PHẦN MỀM IN",
//   },
//   {
//     id: 2833,
//     image: [
//       { key: "product4", src: img2833_1, alt: "product4", fill: true },
//       { key: "product3", src: img2833_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       "Hạn Chế Trong Quá Trình Hiển Thị Ý Tưởng", "Khả Năng Giao Tiếp Hạn Chế", "Thời Gian và Chi Phí Đáng Kể", "Khó Khăn Trong Việc Thay Đổi và Điều Chỉnh", "Khả Năng Hiểu Biết Hạn Chế"
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "IWINDOOR",
//   },
//   {
//     id: 2853,
//     image: [
//       { key: "product4", src: img2853_1, alt: "product4", fill: true },
//       { key: "product3", src: img2853_2, alt: "product3", fill: true }
//     ],
//     benafit: [
//       "Hiệu Suất Thấp trong Giao Tiếp", "Khả Năng Đánh Giá và Theo Dõi Hạn Chế", "Rủi Ro Mất Mát Thông Tin", "Khó Khăn Trong Việc Tích Hợp Thông Tin", "Thời Gian Phản Ứng Chậm"
//     ],
//     package: [
//       {
//         title: 'Free',
//         benefit: ['tính tăng cần thiết'],
//         price: 0,
//         current: true
//       },
//       {
//         title: 'Advantage',
//         benefit: ['Ưu đãi giảm giá ', 'tặng 2 tháng'],
//         price: 49,
//         current: false
//       },
//       {
//         title: 'Silver',
//         benefit: ['Ưu đãi giảm giá', 'các tính năng mới nhất,hiện đại nhất', ' tặng 3 tháng'],
//         price: 99,
//         current: false
//       }
//     ],
//     title: "SMARTWORK TRONG XỬ LÝ NHÀ MÁY CÔNG NGHIỆP",
//   },
// ];

const productsData={}
module.exports = productsData