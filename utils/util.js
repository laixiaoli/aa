const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function setStorageSelf(key,data,callBackProcess){
  wx.setStorage({
    data:data,
    key:key,
    success:function(res){
      //叫某个方法执行
      //this.processData(res)
      callBackProcess(res);
    }
  })
}

// 导出
module.exports = {
  formatTime: formatTime,
  setStorageSelf:setStorageSelf
}


