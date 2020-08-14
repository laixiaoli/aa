// pages/detail/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 文字是否收起，默认收起
        ellipsis:true
    },

    // 收起/展开按钮点击事件
    ellipsis:function(e){
        let value = !this.data.ellipsis;
        this.setData({     
            ellipsis:value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const moveId = options.moveId
        // console.log(options.moveId)
        this.getDetail('https://api.douban.com/v2/movie/subject/'+moveId+'?apikey=0b2bdeda43b5688921839c8ecb20399b')
    },

    getDetail:function(url,moveId){
        const _this = this
        wx.request({
            url: url, //仅为示例，并非真实的接口地址
            header: {
              'content-type': 'json' // 默认值
            },
            success (res) {
              console.log(res.data)
              _this.processData(res.data,moveId)
            // _this.setData({
            //     moveId:res.data
            // })
            }
          })
    },

    processData:function(data){
        this.setData({
            moveId:data
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

    }
})