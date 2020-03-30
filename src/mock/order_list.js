import Mock from "mockjs";
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock("order_list.php", "get", function(options) {
  return Mock.mock({
    result: {
      page: "1",
      page_size: 10,
      total_count: 85,
      page_count: 9,
      "item_list|10": [
        {
          "id|+1": 2959165,
          order_sn: /T180[0-9]{6}/,
          bike_sn: "800116090",
          user_id: 908352,
          user_name: "@cname",
          mobile: /1[0-9]{10}/,
          distance: 2000,
          total_time: 4000,
          "status|1-2": 1,
          start_time: "@datetime",
          end_time: "@datetime",
          total_fee: 1000,
          user_pay: 300
        }
      ]
    }
  });
});
