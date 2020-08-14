// pages/index/index.js
// 引入app.js
const app=getApp('app.js')
//引入utils
const util=require('../../utils/util.js')
Page({

			/**
			 * 页面的初始数据
			 */
			data: {
				topMovies: [],
				cpmingMovies: [],
				hotMovies: [],
			},

			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {

				const reqStart='?start=0&count=3&'
				// 影院热映电影数据
				// this.getMovies()
				// 要有连接符
				this.getMovies(app.globalData.doubanHttp+'top250'+reqStart+'apikey='+app.globalData.apikey,'topMovies')
				console.log(app.globalData.doubanHttp)
				// console.log(getMovies)
				// 豆瓣热门电影数据
				// this.getdobanMovies(),
				this.getMovies(app.globalData.doubanHttp+'in_theaters'+reqStart+'apikey='+app.globalData.apikey,'cpmingMovies')
				// 近期热门电影数据
				// this.getjinqiMovies()
				this.getMovies(app.globalData.doubanHttp+'coming_soon'+reqStart+'apikey='+app.globalData.apikey,'hotMovies')
			},

			// 去往影院热门
			// 影院热映
				moreHot: function(e) {
					// console.log(e)
					// 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
					wx.navigateTo({
						url: '/pages/hotmovie/hotmovie?type='+e.currentTarget.dataset.type
					})
					// console.log(e)
				},

				// 豆瓣热门
				// dobanHot:function(e){
				// 	wx.redirectTo({
				// 		url: '/pages/dobanhot/dobanhot'
				// 	})
				// },

				// 近期热门
				// nowHot:function(e){
				// 	wx.redirectTo({
				// 		url: '/pages/nowhot/nowhot'
				// 	})
				// },

				// 去往电影详情页
				toDetail:function(e){
						// console.log(e)
						// 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
						wx.navigateTo({
							url: '/pages/detail/detail?moveId='+e.currentTarget.dataset.movieId
						})
				},

				// 获取电影数据

				getMovies:function(url,type){
					// 定义一个变量 _this存放this this在回调函数里面不会执行
					const _this = this
					util.movieHttp(url,_this.processData,type)
				},

				// 请求成功后处理电影数据
				processData:function(data,type){
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

						// if(movies[i].title.length>6){
						// 	movies[i].title = movies[i].title.substr(0,5)+'...'
						// }
						// console.log(movies[i].title)

						movies[i].star = util.getStars(stars)
						// console.log(movies[i])
					}

					this.setData({
						[type]:movies
					})
				},

				

					/**
					 * 生命周期函数--监听页面初次渲染完成
					 */
					onReady: function() {

					},

					/**
					 * 生命周期函数--监听页面显示
					 */
					onShow: function() {

					},

					/**
					 * 生命周期函数--监听页面隐藏
					 */
					onHide: function() {

					},

					/**
					 * 生命周期函数--监听页面卸载
					 */
					onUnload: function() {

					},

					/**
					 * 页面相关事件处理函数--监听用户下拉动作
					 */
					onPullDownRefresh: function() {

					},

					/**
					 * 页面上拉触底事件的处理函数
					 */
					onReachBottom: function() {

					},

					/**
					 * 用户点击右上角分享
					 */
					onShareAppMessage: function() {

					}
			})
