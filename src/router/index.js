import Vue from 'vue'
import Router from 'vue-router'

// 引入多个模块的规则
// import baseinfoRouter from './modules/baseinfo.js'
// export const asyncRoutes = [baseinfoRouter]
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// 引入自己组件的路由，放到这个数组里
// const asyncRouter = []

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: 'baseinfo',
    name: 'baseinfo',
    component: Layout,
    redirect: '/baseinfo/warehousemanagement',
    meta: { title: '基础信息管理', icon: 'dashboard' },
    children: [{
      path: '/baseinfo/warehousemanagement',
      name: 'warehousemanagement',
      component: () => import('@/views/baseinfo/WarehouseManagement'),
      meta: { title: '仓库管理' }
    },
    {
      path: '/baseinfo/reservoirmanagement',
      name: 'reservoirmanagement',
      component: () => import('@/views/baseinfo/ReservoirManagement'),
      meta: { title: '库区管理' }
    },
    {
      path: '/baseinfo/binlocationmanagement',
      name: 'binlocationmanagement',
      component: () => import('@/views/baseinfo/BinLocationManagement'),
      meta: { title: '库位管理' }
    },
    {
      path: '/baseinfo/binbitview',
      name: 'binbitview',
      component: () => import('@/views/baseinfo/BinBitView'),
      meta: { title: '库位视图' }
    },
    {
      path: '/baseinfo/goodsmanagement',
      name: 'goodsmanagement',
      component: () => import('@/views/baseinfo/GoodsManagement'),
      meta: { title: '货品管理' }
    },
    {
      path: '/baseinfo/itemtypemanagement',
      name: 'itemtypemanagement',
      component: () => import('@/views/baseinfo/ItemTypeManagement'),
      meta: { title: '货品类型管理' }
    },
    {
      path: '/baseinfo/detail/:id',
      name: 'addWarehouse',
      component: () => import('@/views/baseinfo/addWarehouse'),
      hidden: true,
      meta: { title: '添加仓库' }
    },
    {
      path: '/baseinfo/reservoirDetail/:id',
      name: 'addReservoir',
      component: () => import('@/views/baseinfo/addReservoir'),
      hidden: true,
      meta: { title: '添加仓库' }
    }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
