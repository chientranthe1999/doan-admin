import Vue from 'vue'
import VueRouter from 'vue-router'
import AmdinLayout from '@/layout/AdminLayout'

Vue.use(VueRouter)

const allRoutes = [
  {
    path: '/manage',
    component: AmdinLayout,
    meta: { title: 'Quản lý', icon: 'el-icon-money' },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/manage/Dashboard'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'debt',
        name: 'DebtList',
        component: () => import('@/views/manage/Debt'),
        meta: { title: 'Quản lý công nợ' }
      },
      {
        path: 'booking',
        name: 'BookingList',
        component: () => import('@/views/manage/Booking'),
        meta: { title: 'Quản lý đơn hàng' }
      }
    ]
  },
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
    path: '/comment',
    component: AmdinLayout,
    meta: { title: 'Comment', icon: 'el-icon-chat-line-square' },
    children: [
      {
        path: '',
        name: 'CommentList',
        component: () => import('@/views/comment/List'),
        meta: { title: 'Comment' }
      }
    ]
  },

  {
    path: '/article',
    component: AmdinLayout,
    meta: { title: 'Tin tức', icon: 'el-icon-notebook-1' },
    children: [
      {
        path: '',
        name: 'ArticleList',
        component: () => import('@/views/article/List'),
        meta: { title: 'Danh sách bài viết' }
      },
      {
        path: 'add',
        name: 'ArticleAdd',
        component: () => import('@/views/article/Add'),
        meta: { title: 'Thêm bài mới' }
      }
    ]
  },

  {
    path: '/voucher',
    component: AmdinLayout,
    meta: { title: 'Voucher', icon: 'el-icon-s-ticket' },
    children: [
      {
        path: '',
        name: 'VoucherList',
        component: () => import('@/views/voucher/List'),
        meta: { title: 'Danh sách voucher' }
      },
      {
        path: 'add',
        name: 'VoucherAdd',
        component: () => import('@/views/voucher/Add'),
        meta: { title: 'Thêm voucher mới' }
      }
    ]
  },

  {
    path: '/user',
    component: AmdinLayout,
    meta: { title: 'Quản lý chủ sân', icon: 'el-icon-s-custom' },
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/views/user/List'),
        meta: { title: 'Danh sách chủ sân' }
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/Add'),
        meta: { title: 'Thêm mới chủ sân' }
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
