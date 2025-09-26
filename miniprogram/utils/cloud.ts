/**
 * 云函数返回结果的通用接口
 */
interface CloudFunctionResult<T = any> {
  success: boolean;
  data?: T;
  errCode?: string;
  errMsg?: string;
}

/**
 * 微信云函数调用响应接口
 */
interface WxCloudCallResult {
  errMsg: string;
  result: CloudFunctionResult;
  requestID: string;
}

/**
 * 统一的云函数调用方法
 * @param name 云函数名称
 * @param data 传递给云函数的参数
 * @returns Promise<T> 返回业务数据
 */
export const callCloudFunction = async <T = any>(
  name: string,
  data: Record<string, any> = {}
): Promise<T> => {
  try {
    const response = (await wx.cloud.callFunction({
      name,
      data,
    })) as WxCloudCallResult;

    // 检查响应是否存在
    if (!response) {
      throw new Error("云函数调用无响应");
    }

    // 检查result是否存在
    if (!response.result) {
      throw new Error("云函数返回结果异常");
    }

    const { result } = response;

    // 检查业务逻辑是否成功
    if (result.success) {
      return result.data as T;
    } else {
      // 抛出业务错误
      const errorMessage = result.errMsg || "未知错误";
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error(`云函数${name}调用失败:`, error);

    // 统一错误提示
    wx.showToast({
      title: "服务异常，请重试",
      icon: "none",
      duration: 2000,
    });

    // 重新抛出错误，让调用方可以进行进一步处理
    throw error;
  }
};
