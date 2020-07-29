// pages/demo1/demo1.js
// 本地导入
const util = require("../../utils/util");

  

var setImg = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 次数
    winNam:0,
    // 动图
    userImg:"../../image/dotu.gif",
    // 评价
    textname:"",
    // 石头剪刀布的下标
    autoIdx:0,
    // 图片的数组
    imageUrl:['../../image/bu.png','../../image/jiandao.png','../../image/shito.png'],
    flg:false, //判断再来一次按钮是否可用，初始化下为false
    userId:false
  },

// 修改下标的方法
changeIdx:function(){
      if(this.data.autoIdx==2){

        this.data.autoIdx=-1;
      }
      // setData({})函数用于将数据从逻辑层发送到视图层（异步）同时改变对应的this.data的值（同步）赋值
      this.setData({
        autoIdx:this.data.autoIdx+1
      })
},



// 出拳事件
chooseImg:function(e){
  // 用户选择的结果
  // console.log(e.target.dataset.imgid)

  // const变量声明 用户
  const userImg=e.target.dataset.imgid

  // 机器停留的结果
  // console.log(this.data.autoIdx)
  const autoImg=this.data.autoIdx

  // 自定义变量 评价
  let  evaluate=''

  // 自定义变量 次数 先保存当前获胜次数
  let frequency= this.data.winNam //0

  //比较结果
  if(userImg==autoImg){
      //平局
      evaluate='平局，平局，再来再来'
  }
  // 赢的结果 用户布 VS 机器石头 || 用户剪刀 VS 机器布 || 用户石头 VS 机器剪刀
  else if((userImg==0 && autoImg==2)||(userImg==1&&autoImg==0)||(userImg==2&&autoImg==1)){
    evaluate='哈哈哈，我赢了'
    frequency=++frequency
    // console.log(frequency)
  }else{
    evaluate='唉，输了'
  }

  

  //当flg = false && e.target.dataset.imgid
  // console.log(e)
  // console.log(e.target.dataset.imgid)
  //当flg=false才做事
  if(this.data.flg==false && e.target.dataset.imgid){
    clearInterval(setImg);
    
    //把选中的图片置于用户选择区
    //比较结果
    // 平局
    // 赢
    // 输
    this.setData({
      // 获取动图的图片
      userImg:this.data.imageUrl[userImg],
      flg:true,
      // 文本的文字
      textname:evaluate,
      // 次数
      winNam:frequency
    })
    // console.log(this.data.flg)
  }
},

// 再来一次事件
again:function(e){
	//当flg=true才做事
	if(this.data.flg==true){
		setImg = setInterval(this.changeIdx,100)
		this.setData({
      // 清空文本
      textname:'',
      // 动图还原
      userImg:'../../image/dotu.gif',
			flg:false
		})
	}
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad');
    
    // 本地缓存中指定的key
    // console.log (wx.getStorageSync('花花'));
    // 定时播放
    setImg = setInterval(this.changeIdx,100);

    util.setStorageSelf('key_0724','哈哈哈哈哈',this.processData);
    wx.setStorage({
      data:"哈哈哈哈哈",
      data:"key_0724",
      success:function(res){
        this.processData(res);
      }
    })
    console.log(options);//options={nickName:"花花"}
    console.log(options['nickName']);
    // 如果nickName有值 取缓存  替换次数winNam
    if(options.nickName){
      const setStorageSync =  wx.setStorageSync(options.nickName);
      this.setData({
        winNam:setStorageSync
        // userId:
      })
    }
  },

  processData:function(data){
    console.log(data);
  },

// navigateTo保留当前页面，跳转到应用内的某个页面。
 tiaoz:function(e){
	 wx.navigateTo({
		 url:'../demo/demo',
	 })
 },
 
 // redirectTo关闭当前页面，跳转到应用内的某个页面。
 rediRectTo:function(e){
	 wx.redirectTo({
	   url: '../demo/demo',
	 })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // var _this=this
    wx.setStorageSync(this.data.userId,this.data.winNam);
    // 保存用户赢得次数
    // wx.setStorageSync('花花',2)
    // console.log(wx.setStorageSync('花花',2));

    // wx:wx.setStorage({
    //   data: this.data.winNam,
    //   key: '花花',
    //   success:function(){
    //     wx.setStorageSync('花花',1)
    //   },
      
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})