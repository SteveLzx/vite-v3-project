import Layout from 'layouts/index.vue'

export default [
  { 
    path: '/', 
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('views/home.vue')
      }
    ]
  },
]