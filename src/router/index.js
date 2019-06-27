import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
// import modelerRouter from './modules/flowable-modeler'

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/reg',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/homedesigner',
    component: () =>import('@/views/home/HomeDesign'),
    hidden: true
  },
  {
    path: '/appinfomation',
    component: () =>import('@/views/home/AppInfomation'),
    hidden: true
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/home',
    // redirect: '/home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/form',
    component: () => import('@/views/form/index'),
    redirect: '/form/formdesign',
    name: 'form',
    meta: { title: '表单设计', icon: 'table' },
    children: [
      {
        path: 'formdesign',
        name: 'formdesign',
        component: () => import('@/views/form/menu/formDesign'),
        meta: { title: 'formdesign', icon: 'table', keepAlive:true}
      },
      {
        path: 'flowdesign',
        name: 'flowdesign',
        component: () => import('@/views/form/menu/flowDesign'),
        meta: { title: 'flowdesign', icon: 'table', keepAlive:true}
      },
      {
        path: 'listdesign',
        name: 'listdesign',
        component: () => import('@/views/form/menu/listDesign'),
        meta: { title: 'listdesign', icon: 'table', keepAlive:true}
      },
      {
        path: 'formsetting',
        name: 'formsetting',
        component: () => import('@/views/form/menu/formSetting'),
        meta: { title: 'formsetting', icon: 'table', keepAlive:true}
      }
    ]
  },
  {
    path: '/wform',
    component: () => import('@/views/wform/index')
  },
  {
    path: '/app',
    component: Layout,
    redirect: '/app/application',
    name: 'app',
    meta: { title: '应用管理', icon: 'application' },
    children: [
      {
        path: 'application',
        name: 'application',
        component: () => import('@/views/app/index'),
        meta: { title: '应用管理', icon: 'table' }
      },
      {
        path: 'authority',
        name: 'authority',
        component: () => import('@/views/authority/index'),
        meta: { title: '权限管理', icon: 'table' }
      },
      {
        path: 'addressInfo',
        name: 'addressInfo',
        component: () => import('@/views/addressInfo/index'),
        meta: { title: '场景管理', icon: 'table' }
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/organization/index'),
        meta: { title: '组织机构', icon: 'table' }
      },
      {
        path: 'peopleInfo',
        name: 'peopleInfo',
        component: () => import('@/views/peopleInfo/index'),
        meta: { title: '人员管理', icon: 'table' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '应用管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '权限管理', icon: 'form' }
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
