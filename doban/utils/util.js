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

// 电影数据的处理
function movieHttp(url,callBack,type){
  wx.request({
    //请求接口地址
    url: url, 
    header: {
      'content-type': 'json' // 默认值
    },
    success (res) {
      // 执行请求成功后的方法
      // 处理数据
      // console.log(res.data);
      // console.log(res.data.subjects);
      callBack(res.data,type)
    }
    })
}

// 处理评分的星星
function getStars(stars){
  //45==>[2,2,2,2,1]
  //30==>[2,2,2,0,0]
  // 定义一个空数组，存放
  let starArr=[]
  // 判断第一位数是几，然后循环加几个2
  // substr字符串截取
  // 35 ==[]
  const left = stars.substr(0,1) //左边的3 从下标开始取 第一位开始取一位
  const right = stars.substr(1,1) //右边的5  从下标开始取 第二位开始取一位

  for(let i=0;i<left;i++){
    starArr.push(2)
  }

  //在当前数组长度<5的情况下  判断第二位是否是5
  if(starArr.length<5 && right=='5'){
    starArr.push(1)
  }

  //补齐0（一直补到数组长度为5）
  // 35 [2,2,2,1] 从第四位开始补  补到长度为5  starArr.length~5 从下标开始数
  // 20 [2,2]		从第二位开始补   补到长度为5  starArr.length~5 从下标开始数

  for(let i=starArr.length;i<5;i++){
      starArr.push(0)
  }
  // console.log(stars,starArr)

  // 返回处理好的长度为五的数组
  return starArr
}

module.exports = {
  formatTime: formatTime,
  movieHttp:movieHttp,
  getStars:getStars
}
