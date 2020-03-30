/* 点击结束订单按钮请求的数据 */
import Mock from "mockjs";
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock("order_edike_info.php", "get", function(options) {
  return Mock.mock({
    result: {
      id: 27296,
      bike_sn: 800116116,
      battery: 100,
      start_time: "@datetime",
      location: "北京市海淀区奥林匹克花园"
    }
  });
});
