import Layout from '@/layout'
// 导入展示页面
// 导出
export default {
  path: '/storage',
  component: Layout,
  meta: { title: '入库管理', icon: 'dashboard' },
  children: [
      {
        path: 'storagerecipt',
        component: () => import('@/views/storage/StorageRecipt'),
        meta:{title:'入库单'}
      },
      {
        path: 'accepttask',
        component: () => import('@/views/storage/AcceptTask'),
        meta:{title:'收货任务'}
      },
      {
        path: 'groundingtask',
        component: () => import('@/views/storage/GroundingTask'),
        meta:{title:'上架任务'}
      },
    ]
}