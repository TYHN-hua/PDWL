
  
import Layout from '@/layout'
export default {
  path: '/OutboundManagement',
  component: Layout,
  redirect: '/OutboundManagement/outboundDeliveryOrder',
  name: 'OutboundManagement',
  meta: { title: '出库管理', icon: 'form' },
  children: [
    {
      path: 'outboundDeliveryOrder',
      name: 'outboundDeliveryOrder',
      component: () => import('@/views/OutboundManagement/components/outboundDeliveryOrder'),
      meta: { title: '出库单' }
    },
    {
      path: 'PickUpTheTask',
      name: 'PickUpTheTask',
      component: () => import('@/views/OutboundManagement/components/PickUpTheTask'),
      meta: { title: '拣货任务' }
    },
    {
      path: 'HandoverTask',
      name: 'HandoverTask',
      component: () => import('@/views/OutboundManagement/components/HandoverTask'),
      meta: { title: '拣货任务' }
    }
  ]
}