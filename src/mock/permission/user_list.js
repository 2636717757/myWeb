import Mock from 'mockjs';
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock('permission_user_list.php', 'get', function(options) {
  return Mock.mock({
    code: 0,
    'result|20': [
      {
        'status|0-1': 0,
        'user_id|+1': 1,
        user_name: '@cname',
      },
    ],
  });
});
