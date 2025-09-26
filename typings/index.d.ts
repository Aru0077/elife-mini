/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
	userInfo?: WechatMiniprogram.UserInfo,
	env?:string
  }
  initCloud():void
  userLogin():void
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}