/* 假装城市开通成功 */
import Mock from "mockjs";
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock("city_open.php", "get", function(options) {
  return Mock.mock({
    code: 0,
    result: "开通成功"
  });
});
