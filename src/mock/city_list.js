import Mock from 'mockjs';
// 设置4秒后再响应
Mock.setup({ timeout: 1000 });
// Mock响应模板
Mock.mock('city_list.php', 'get', function(options) {
  return Mock.mock({
    result: {
      page: 1,
      page_size: 10,
      total_counter: 6,
      'item_list|10': [
        {
          'id|+1': 1,
          /* @city：随机城市 */
          name: '@city',
          'mode|1-2': 1,
          'op_mode|1-2': 1,
          franchisee_id: 77,
          franchisee_name: '松果自营',
          'city_admins|1-2': [
            {
              /* @cname随机人名 */
              user_name: '@cname',
              'user_id|+1': 10001,
            },
          ],
          /* @datetime:随机日期 */
          open_time: '@datetime',
          sys_user_name: '@cname',
          update_time: 1520476737000,
        },
      ],
    },
  });
});
