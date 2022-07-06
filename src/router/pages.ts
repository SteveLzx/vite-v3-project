import Layout from 'layouts/index.vue'
import AppMain from 'layouts/components/AppMain.vue'

export default [
  { 
    path: '/', 
    component: Layout,
    children: [
      {
        path: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('views/home.vue')
      },
      {
        path: 'home1',
        component: () => import('views/home.vue')
      },
      {
        path: 'home2',
        component: () => import('views/home.vue')
      },
      {
        path: 'home3',
        component: () => import('views/home.vue')
      },
      {
        path: 'home4',
        component: () => import('views/home.vue')
      },
      {
        path: 'home5',
        component: () => import('views/home.vue')
      },
      {
        path: 'home6',
        component: () => import('views/home.vue')
      },
      {
        path: 'home7',
        component: () => import('views/home.vue')
      },
      {
        path: 'home8',
        component: () => import('views/home.vue')
      },
      {
        path: 'home9',
        component: () => import('views/home.vue')
      },
      {
        path: 'home10',
        component: () => import('views/home.vue')
      },
      {
        path: 'home11',
        component: () => import('views/home.vue')
      },
      {
        path: 'home12',
        component: () => import('views/home.vue')
      },
      {
        path: 'home13',
        component: () => import('views/home.vue')
      },
      {
        path: 'home14',
        component: () => import('views/home.vue')
      },
      {
        path: 'home15',
        component: () => import('views/home.vue')
      },
      {
        path: 'home16',
        component: () => import('views/home.vue')
      },
      {
        path: 'home17',
        component: () => import('views/home.vue')
      },
      {
        path: 'home18',
        component: () => import('views/home.vue')
      },
      {
        path: 'home19',
        component: () => import('views/home.vue')
      },
      {
        path: 'home20',
        component: () => import('views/home.vue')
      },
      {
        path: 'home21',
        component: () => import('views/home.vue')
      },
      {
        path: 'home22',
        component: () => import('views/home.vue')
      },
      {
        path: 'home23',
        component: () => import('views/home.vue')
      },
      {
        path: 'home24',
        component: () => import('views/home.vue')
      },
      {
        path: 'home25',
        component: () => import('views/home.vue')
      },
      {
        path: 'home26',
        component: () => import('views/home.vue')
      },
      {
        path: 'home27',
        component: () => import('views/home.vue')
      },
      {
        path: 'home28',
        component: () => import('views/home.vue')
      },
      {
        path: 'home29',
        component: () => import('views/home.vue')
      },
      {
        path: 'home30',
        component: () => import('views/home.vue')
      }            
    ]
  },
  {
    path: '/goods', 
    redirect: '/goods/local/list',
    component: Layout,
    meta: {
      title: '商品管理'
    },    
    children: [
      {
        path: 'local',
        component: AppMain,
        meta: {
          title: '本地商品管理',
        },
        children: [
          {
            path: 'list',
            name: 'GoodsLocalList',
            meta: {
              title: '本地商品列表',
              keepAlive: true
            },
            component: () => import('views/goods/local/list.vue')
          },
          {
            path: 'create',
            name: 'GoodsLocalCreate',
            meta: {
              title: '新增本地商品',
              keepAlive: true
            },
            component: () => import('views/goods/local/create.vue')
          },
          {
            path: 'edit',
            name: 'GoodsLocalEdit',
            meta: {
              title: '编辑本地商品',
              keepAlive: true
            },
            component: () => import('views/goods/local/edit.vue')
          },                         
        ]
      },      
    ]
  }
]