// 转为表单数据类型
export const objectToSerialize = data => {
  let form_data;
  for (let index in data) {
    form_data += `&${index}=${data[index]}`;
  }
  return form_data.substring(10);
}

// 转换时间为 yyyy-MM-dd 形式
export const handleTime = fmt => {
  var data = new Date();
  var o = {
    "M+": data.getMonth() + 1,                   //月份 
    "d+": data.getDate(),                        //日 
    "h+": data.getHours(),                       //小时 
    "m+": data.getMinutes(),                     //分 
    "s+": data.getSeconds(),                     //秒 
    "q+": Math.floor((data.getMonth() + 3) / 3), //季度 
    "S": data.getMilliseconds()                  //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}