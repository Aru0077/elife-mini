/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
	env?: string;
  };
  initCloud(): void;
  userLogin(): Promise<void>;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}
