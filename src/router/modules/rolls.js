// 导出员工的路由规则
import Layout from '@/layout'

export default {
  path: '/rolls',
  component: Layout,
  redirect: '/rolls/inventorylist',
  name: 'rolls',
  meta: {
    title: '库内管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'inventorylist',
      component: () => import('@/views/rollsManagement/Inventorylist'), // Parent router-view
      name: 'inventorylist',
      meta: { title: '盘点单' }
    },
    {
      path: 'countingtask',
      component: () => import('@/views/rollsManagement/countingTask'), // Parent router-view
      name: 'countingtask',
      meta: { title: '盘点任务' }
    },
    {
      path: 'profit',
      component: () => import('@/views/rollsManagement/profit'), // Parent router-view
      name: 'profit',
      meta: { title: '库存损益' }
    },
    {
      path: 'timeinventory',
      component: () => import('@/views/rollsManagement/timeInventory'), // Parent router-view
      name: 'timeinventory',
      meta: { title: '实时库存' }
    },
    {
      path: 'addinventory',
      component: () => import('@/views/rollsManagement/components/addInventory'),
      name: 'addInventory'
      // meta: { title: '盘点单' }
    }
  ]
}
