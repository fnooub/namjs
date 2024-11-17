const inputData = [
    [
        "杨浩",
        "Dương Hạo",
        "dương hạo",
        1
    ],
    [
        " = 43---|---",
        " = 43---|---",
        "",
        0
    ],
    [
        "自己",
        "mình/chính mình/chính/tự mình/bản thân/nhà",
        "tự kỷ",
        1
    ],
    [
        " = 17---|---",
        " = 17---|---",
        "",
        0
    ],
    [
        "徐",
        "từ",
        "từ",
        2
    ],
    [
        "冰",
        "băng/rét/đá",
        "băng",
        1
    ],
    [
        " = 3---|---",
        " = 3---|---",
        "",
        0
    ],
    [
        "你",
        "ngươi/cậu",
        "nhĩ",
        1
    ],
    [
        "还",
        "còn/trả/hoàn/vẫn/còn chưa",
        "hoàn",
        1
    ],
    [
        " = 3---|---",
        " = 3---|---",
        "",
        0
    ],
    [
        "女婿",
        "con rể/chồng",
        "nữ tế",
        1
    ],
    [
        " = 3---|---",
        " = 3---|---",
        "",
        0
    ]
];
function translateMultiArray(arrays) {
  var result = [];

  for (var i = 0; i < arrays[0].length; i++) {
    var currentElement = [];

    for (var j = 0; j < arrays.length; j++) {
      currentElement.push(arrays[j][i]);
    }

    if (i === 1) {
      // Thêm ký tự ngăn cách phù hợp cho phần tử thứ 2
      result.push(currentElement.join(' | '));
    } else if (i === 2) {
      // Thêm một khoảng trắng vào giữa các phần tử
      result.push(currentElement.join(' '));
    } else {
      result.push(currentElement.join(''));
    }
  }

  return result.length === 1 ? result[0] : result;
}


function processAndTranslateArrays(arrays) {
  const result = [];
  let currentArray = [];

  for (const array of arrays) {
    if (array[3] !== 0) {
      currentArray.push(array);
    } else {
      if (currentArray.length > 0) {
        result.push(translateMultiArray(currentArray));
        currentArray = [];
      }
      result.push(array);
    }
  }

  if (currentArray.length > 0) {
    result.push(translateMultiArray(currentArray));
  }

  return result;
}

const processArrays = processAndTranslateArrays(inputData);
    const tuLapJoin = processArrays.map(([h, v, hv, w]) => {
      // Kiểm tra nếu phần tử thứ tư là 0
      if (w === 0) {
        // Chỉ lấy phần tử đầu tiên
        return h;
      } else {
        // Ngược lại, giữ nguyên mảng con
        return `${h} = ${v} = ${hv}`;
      }
    });
console.log(tuLapJoin);

kết quả:
['杨浩 = Dương Hạo = dương hạo', ' = 43---|---', '自己 = mình/chính mình/chính/tự mình/bản thân/nhà = tự kỷ', ' = 17---|---', '徐冰 = từ | băng/rét/đá = từ băng', ' = 3---|---', '你还 = ngươi/cậu | còn/trả/hoàn/vẫn/còn chưa = nhĩ hoàn', ' = 3---|---', '女婿 = con rể/chồng = nữ tế', ' = 3---|---']

