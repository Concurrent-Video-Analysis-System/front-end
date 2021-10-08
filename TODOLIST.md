#### 二期工程

- [x] 筛选功能

  - [x] 筛选列表的字段类型
  - [x] 筛选下拉框（不用增加新的）
  - [x] 筛选列表的发送请求
  - [x] useForm 好像有个小 bug

- [x] 进度条和时间动画
- [x] dashboard 的可视化日期好像有 bug，修一下
- [x] dashboard 左边的违规记录应该设置折行（封装成 paragraph 独立组件）
- [x] 主页的左边栏设置快捷链接直接连接到处理页面
- [ ] 设置错误链接，如果出错就不跳转（现在 catch 好像 catch 不到，有个小 bug）
- [x] 任务界面的 device 有个 bug
- [x] 导出表格换地址问题
- [x] 进度条动画用 useMemo 包一下减少卡顿
- [x] task-card 上面应该显示算法检查的原因
- [ ] /device/edit 接口的实现
- [x] 图表只有一列时 柱状图太宽了
- [x] 当没有数据时图表应该显示为空
- [x] 加 Document.Title

---

#### 三期项目

- [x] record 加上多个筛选条件
  - [x] 按照设备筛选
  - [x] 按照任务筛选
- [x] task 也加上多种筛选
- [x] 现在在 url 中 reason 查询时传入的时 name，应该改成 id
- [x] 重命名：pageNum -> page; num -> pageSize
- [x] pageNum 和 num 的默认值应该分开算
- [x] RecordHandlingFragment 的 bug
- [ ] 任务跳转到对应的违规记录
  - [x] 违规记录的筛选
  - [x] 任务跳转按钮
- [x] isEveryDayTask
- [ ] Breadcrumb 重写
- [x] 导出数据
- [ ] Loading
- [ ] 设置错误链接，如果出错就不跳转（现在 catch 好像 catch 不到，有个小 bug）
- [ ] 前端画框
- [x] 删除任务应该先删除再发回请求
- [ ] 跳转到带有 querystring 的路由会出问题
- [x] task 筛选列表为空（解决方法：把 useGeneralLists 移动到单独的页面）
- [ ] 轮询更新违规记录
- [ ] 列表视图下完成处理和查看详情
- [ ] 自动登录的优化
