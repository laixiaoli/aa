// pages/hotmovie/hotmovie.js
// 引入app.js
const app = getApp('app.js')
// 引入utils
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMovie: [],
    total:0,
    url:''
    // twoMovie: [],
    // threeMovie: [],
    // fourMovie: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.type)
    const reqStart='?start=0&count=12&'
    // const url = app.globalData.doubanHttp+'in_theaters'+reqStart+'apikey='+app.globalData.apikey
    const url= this.getUrl(options.type)+this.data.total
    // 获取电影的地址
    this.getUrl(options.type,url)

    // 查询对应type的电影数据
    this.getMovies(this.getUrl(options.type),'topMovie');
    this.getMovies(url)
    // console.log(options.url)
    // start从哪里开始
    // 第一个
    // this.getMovies(app.globalData.doubanHttp+'in_theaters?&start=0&count=3&apikey='+app.globalData.apikey,'topMovie')
    // 第二个
    // this.getMovies(app.globalData.doubanHttp+'in_theaters?&start=3&count=3&apikey='+app.globalData.apikey,'twoMovie')
    // 第三个
    // this.getMovies(app.globalData.doubanHttp+'coming_soon?&start=3&count=3&apikey='+app.globalData.apikey,'threeMovie')
    // 第四个
    // this.getMovies(app.globalData.doubanHttp+'coming_soon?&start=3&count=3&apikey='+app.globalData.apikey,'fourMovie')

    this.getMoremovies()
  },

  // 获取电影数据
  getMovies:function(url,type){
    // 定义一个变量 _this存放this this在回调函数里面不会执行
    const _this = this
    util.movieHttp(url,_this.processData,type)
  },

  // 获取电影的地址
  getUrl:function(type){
    let url=''
    const reqStart='?count=12&apikey='+app.globalData.apikey+'&start='
    let title=''
    if(type==0){
      url=app.globalData.doubanHttp+'top250'+reqStart+'apikey='+reqStart
      title='影院热映'
    }else if(type==1){
      url=app.globalData.doubanHttp+'in_theaters'+reqStart+'apikey='+reqStart
      title='豆瓣热门'
    }else{
      url=app.globalData.doubanHttp+'coming_soon'+reqStart+'apikey='+reqStart
      title='近期热门剧集'
    }
    
    // API-导航栏
    wx.setNavigationBarTitle({
      title: title
    })

    return url

  },


  // 查询对应type的电影数据
  getMoviestype:function(url){
    // console.log(url)
    util.movieHttp(url,this.processData)
  },

  // 请求成功后处理电影数据  和星星的获取
  processData:function(data,type){
    // console.log(data)
    // data = res.data
    // type 是topMovies  cpmingMovies hotMovies这三个数组

    // 对三部电影的数组进行遍历
    const movies = data.subjects //数据拷贝
    const len = movies.length

    for(let i=0;i<len;i++){
      //如果当前电影标题长度>6 ==>标题=原标题的前五位+‘···’
      // 修改movies数组
      // console.log(movies[i].title)

      let stars = movies[i].rating.stars

      if(movies[i].title.length>6){
      	movies[i].title = movies[i].title.substr(0,5)+'...'
      }
      // console.log(movies[i].title)

      movies[i].star = util.getStars(stars)
      // console.log(movies[i])
    }

    this.setData({
      [type]:movies,
    })
  },

  // process:function(data){

  // },

  // 去往电影详情页
  toDetail:function(e){
    console.log(e)
    // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
    // 带参数跳转
    wx.navigateTo({
      url: '/pages/detail/detail?moveId='+e.currentTarget.dataset.movieId
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
    // console.log(11)
    this.processmoremovie()
  },

  processmoredata:function(data){
    console.log(data)
      this.setData({
        movies:data.subjects,
        total:data.subjects.length
      })
  },

  //触底之后的查询数据
  getMoremovies:function(){
    util.movieHttp(this.data.url+this.data.total,this.processmoremovie)
  },

  processmoremovie:function(data){
    console.log(data)
    //数组拼接
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})