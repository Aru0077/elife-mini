/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
	userInfo?: WechatMiniprogram.UserInfo,
	env?:string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}