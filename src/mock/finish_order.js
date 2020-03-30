/* 结束订单成功 */
import Mock from "mockjs";
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock("finish_order.php", "get", function(options) {
  return Mock.mock({
    code: 0,
    result: "订单结束成功"
  });
});
