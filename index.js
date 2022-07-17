const data = require("./data.json");

const studentFactory = (infors) => ({
  maSV: infors.maSV,
  tenSV: infors.tenSV,
  tuoi: infors.tuoi,
  gioiTinh: infors.gioiTinh,
  ngaySinh: infors.ngaySinh,
  lop: infors.lop,
  monToan: {
    diemToan: infors.diemToan,
    state: checkQuaMon(infors.diemToan),
  },
  monLy: {
    diemLy: infors.diemLy,
    state: checkQuaMon(infors.diemLy),
  },
  monHoa: {
    diemHoa: infors.diemHoa,
    state: checkQuaMon(infors.diemHoa),
  },
  monAnh: {
    diemAnh: infors.diemAnh,
    state: checkQuaMon(infors.diemAnh),
  },
  diemTb: diemTb(infors),
  xepLoai: markString(diemTb(infors)),
});

//Danh sách sinh viên
const dssv = data.map((infors) => studentFactory(infors));
console.log("Danh sách sinh viên: ");
console.log(dssv);

///Tính điểm trung bình các môn
function diemTb(infors) {
  return (
    (infors.diemToan + infors.diemLy + infors.diemHoa + infors.diemAnh) / 4
  );
}

function sinhVienDiemTbMax(lop) {
  ///Lọc ra danh sách sinh viên theo lớp
  const svLop = dssv.filter((infors) => infors.lop === lop);
  ///Tìm điểm trung bình max theo lớp
  const countSv = svLop.length;
  max = svLop[0].diemTb;
  for (var i = 0; i < countSv; i++) {
    if (max < svLop[i].diemTb) max = svLop[i].diemTb;
  }

  //Lọc ra sinh viên có điểm trung bình max theo lướp
  const svMax = svLop.filter((sv) => sv.diemTb === max);

  return svMax;
}

function sinhVienDiemTbMin(lop) {
  //Lọc ra danh sách sinh viên theo lớp
  const svLop = dssv.filter((infors) => infors.lop === lop);
  ///Tìm điểm trung bình min theo lớp
  const countSv = svLop.length;
  min = svLop[0].diemTb;
  for (var i = 0; i < countSv; i++) {
    if (min > svLop[i].diemTb) min = svLop[i].diemTb;
  }

  //Lọc ra sinh viên có điểm trung bình min theo lớp
  const svMin = svLop.filter((sv) => sv.diemTb === min);

  return svMin;
}

function checkQuaMon(diem) {
  if (diem >= 4) {
    return "qua môn";
  }
  return "tạch môn";
}

function markString(mark) {
  if (mark < 4) {
    return "F";
  } else if (mark < 5) {
    return "D";
  } else if (mark < 5.5) {
    return "D+";
  } else if (mark < 7) {
    return "C";
  } else if (mark < 8.5) {
    return "B";
  } else {
    return "A";
  }
}

//Danh sách lớp
const dsLop = [...new Set(dssv.map((sv) => sv.lop))];

console.log("Danh sách sinh viên có điểm trung bình cao nhất các lớp: ");
const dssvDiemTbMax = dsLop.map((lop) => sinhVienDiemTbMax(lop));
console.log(dssvDiemTbMax);

console.log("Danh sách sinh viên có điểm trung bình thấp nhất các lớp: ");
const dssvDiemTbMin = dsLop.map((lop) => sinhVienDiemTbMin(lop));
console.log(dssvDiemTbMin);
