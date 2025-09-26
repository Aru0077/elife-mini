// cloud/userLogin/index.ts
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    const db = cloud.database();
    const userCollection = db.collection("users");

    // 检查用户是否存在
    const existingUser = await userCollection
      .where({
        openid: wxContext.OPENID,
      })
      .get();

    let userData;

    if (existingUser.data.length === 0) {
      // 用户不存在，创建用户
      const result = await userCollection.add({
        data: {
          openid: wxContext.OPENID,
          created_at: new Date(),
		  updated_at: new Date(),
		  status:''
        },
      });
    }

    const addUser = await cloud.database().collection("users").add();
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
