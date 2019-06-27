import Layout from '@/layout'
// import Layout from '@/views/layout/Layout'

const modelerRouter = {
  path: '/flowable-modeler',
  component: Layout,
  name: 'flowable-modeler',
  redirect: '/flowable-modeler/processes',
  children: [
    {
      path: 'processes',
      component: () => import('@/views/organization/index'),
      name: 'processes',
      meta: { title: 'processes', icon: 'tree', root: 'modeler', page: 'processes' }
    },
    {
      path: 'casemodels',
      component: () => import('@/views/organization/index'),
      name: 'casemodels',
      meta: { title: 'casemodels', icon: 'example', root: 'modeler', page: 'casemodels' }
    },
    {
      path: 'forms',
      component: () => import('@/views/organization/index'),
      name: 'forms',
      meta: { title: 'forms', icon: 'form', root: 'modeler', page: 'forms' }
    },
    {
      path: 'decision-tables',
      component: () => import('@/views/organization/index'),
      name: 'decision-tables',
      meta: { title: 'decision-tables', icon: 'guide', root: 'modeler', page: 'decision-tables' }
    },
    {
      path: 'apps',
      component: () => import('@/views/organization/index'),
      name: 'apps',
      meta: { title: 'apps', icon: 'star', root: 'modeler', page: 'apps' }
    }
  ]
}
export default modelerRouter
