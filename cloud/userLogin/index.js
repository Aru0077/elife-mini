// cloud/userLogin/index.ts
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
	try {
		// 记录请求信息用于调试
		console.log("请求ID:", context.requestId);
		console.log("接收到的事件数据:", event);

		const wxContext = cloud.getWXContext();

		return {
			success: true,
			data: {
				openid: wxContext.OPENID,
				appid: wxContext.APPID,
				unionid: wxContext.UNIONID,
			},
		};
	} catch (error) {
		console.error("userLogin 错误:", error);

		return {
			success: false,
			errCode: "USER_LOGIN_ERROR",
			errMsg: error.message || "登录失败",
		};
	}
};
