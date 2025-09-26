// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {

	this.globalData = {
		env: "elife-mini-4gink45h3ba00ada"
	  };
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "elife-mini-4gink45h3ba00ada",
        traceUser: true,
      });
	}
	
	// 云函数登录获取openid
	wx.cloud.callFunction({
		name:'userLogin',
		complete: res =>{
			console.log(res);	
		}
	})
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res.code)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   },
    // })

	
  },
});
