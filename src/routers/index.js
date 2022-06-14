import Vue from 'vue'
import VueRouter from 'vue-router'
import AmdinLayout from '@/layout/AdminLayout'

Vue.use(VueRouter)

const allRoutes = [
  {
    path: '/stadium',
    component: AmdinLayout,
    meta: { title: 'Sân vận động', icon: 'el-icon-location-outline' },
    children: [
      {
        path: '',
        name: 'StadiumList',
        component: () => import('@/views/stadium/List'),
        meta: { title: 'Sân vận động' }
      },
      {
        path: 'add',
        name: 'StadiumAdd',
        component: () => import('@/views/stadium/Add'),
        meta: { title: 'Thêm sân mới' }
      }
    ]
  },

  {
    path: '/login',
    component: () => import('@/views/auth/Login'),
    meta: { title: 'Đăng nhập' },
    hidden: true
  }
]

const createRouter = () => {
  const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
      return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch((err) => {
      if (VueRouter.isNavigationFailure(err)) {
        return err
      }
      return Promise.reject(err)
    })
  }

  const routes = allRoutes

  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes
  })
}

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
