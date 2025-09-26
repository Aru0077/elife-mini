// app.ts
App<IAppOption>({
  globalData: {
	  env:'elife-mini-4gink45h3ba00ada'
  },
  onLaunch() {
	this.initCloud()
	this.userLogin()
  },

  // 初始化云开发
  initCloud(){
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "elife-mini-4gink45h3ba00ada",
        traceUser: true,
      });
	}
  },

  // 调用 userLogin 云函数 进行登录
  userLogin(){
	// 云函数登录获取openid
	wx.cloud.callFunction({
		name:'userLogin',
		success: res =>{
			console.log('登录成功：', res);
		},
		fail: err=>{
			console.log('登录失败：', err);
		},
	})
  },


});
