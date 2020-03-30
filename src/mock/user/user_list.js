import Mock from "mockjs";
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock("user_list.php", "get", function(options) {
  return Mock.mock({
    code: 0,
    message: "",
    result: {
      "list|10": [
        {
          "id|+1": 1,
          username: "@cname",
          "sex|1-2": 1,
          "state|1-5": 1,
          "interest|1-8": 1,
          "isMarried|0-1": 1,
          birthday: "2000-01-01",
          address: "北京市海淀区",
          time: "09:00:00"
        }
      ],
      page: 1,
      page_size: 10,
      total_count: 30
    }
  });
});
