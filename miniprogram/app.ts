// app.ts
App<IAppOption>({
	globalData: {
		env: "elife-mini-4gink45h3ba00ada",
	},
	onLaunch() {
		this.initCloud();

		// 确保云开发初始化完成后再执行登录
		setTimeout(() => {
			this.userLogin();
		}, 200);
	},

	// 初始化云开发
	initCloud() {
		if (!wx.cloud) {
			console.error("请使用 2.2.3 或以上的基础库以使用云能力");
			return;
		}
		try {
			wx.cloud.init({
				env: this.globalData.env,
				traceUser: true,
			});
			console.log('云开发初始化成功');
		} catch (error) {
			console.error('云开发初始化失败:', error);
		}
	},

	// 调用 userLogin 云函数 进行登录
	async userLogin() {
		try {
			const { callCloudFunction } = require('./utils/cloud');
			const loginResult = await callCloudFunction("userLogin");
			console.log("登录成功：", loginResult);

			// 将用户信息存储到全局数据中（如果需要）
			this.globalData.userInfo = loginResult;
		} catch (error) {
			console.log("登录失败：", error);
		}
	},

	onError(error) {
		console.error("小程序全局错误:", error);
	},
});
