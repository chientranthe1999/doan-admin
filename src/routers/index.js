import Vue from 'vue'
import VueRouter from 'vue-router'
import AmdinLayout from '@/layout/AdminLayout'
import { ROLES } from '@/utils/constants'

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
        meta: { title: 'Dashboard', roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'debt',
        name: 'DebtList',
        component: () => import('@/views/manage/Debt'),
        meta: { title: 'Quản lý công nợ', roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'booking',
        name: 'BookingList',
        component: () => import('@/views/manage/Booking'),
        meta: { title: 'Quản lý đơn hàng', roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'booking-list-owner',
        name: 'BookingListOwner',
        component: () => import('@/views/manage/BookingOwner'),
        meta: { title: 'Quản lý đơn hàng', roles: [ROLES.ADMIN] }
      },
      {
        path: 'charge',
        name: 'ChargeList',
        component: () => import('@/views/manage/Charge'),
        meta: { title: 'Quản lý nạp thẻ', roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'report',
        name: 'ReportList',
        component: () => import('@/views/manage/Report'),
        meta: { title: 'Quản lý khiếu nại', roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN] }
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
        meta: { title: 'Sân vận động', roles: [ROLES.ADMIN] }
      },
      {
        path: '/admin',
        name: 'StadiumAdminList',
        component: () => import('@/views/stadium/AdminList'),
        meta: { title: 'Sân vận động', roles: [ROLES.SUPER_ADMIN] }
      },

      {
        path: 'add',
        name: 'StadiumAdd',
        component: () => import('@/views/stadium/Add'),
        meta: { title: 'Thêm sân mới', roles: [ROLES.ADMIN] }
      },

      {
        path: 'edit/:id',
        name: 'StadiumEdit',
        component: () => import('@/views/stadium/Edit'),
        meta: { title: 'Chỉnh sửa sân', roles: [ROLES.ADMIN] },
        hidden: true
      },

      {
        path: '/day-offs',
        name: 'AddDayOff',
        component: () => import('@/views/stadium/DayOff'),
        meta: { title: 'Thêm ngày nghỉ', roles: [ROLES.ADMIN] }
      },
      {
        path: 'type',
        name: 'StadiumTypeList',
        component: () => import('@/views/stadium/ListType'),
        meta: { title: 'Danh sách loại sân', roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'type/add',
        name: 'StadiumTypeAdd',
        component: () => import('@/views/stadium/AddType'),
        meta: { title: 'Thêm loại sân mới', roles: [ROLES.SUPER_ADMIN] }
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
      },
      {
        path: 'type',
        name: 'ArticleAddType',
        component: () => import('@/views/article/AddType'),
        meta: { title: 'Thêm thể loại bài viết', roles: [ROLES.SUPER_ADMIN] }
      },
      {
        path: 'list/type',
        name: 'ArticleTypeList',
        component: () => import('@/views/article/ListType'),
        meta: {
          title: 'Danh sách thể loại bài viết',
          roles: [ROLES.SUPER_ADMIN]
        }
      },
      {
        path: 'type/edit/:id',
        name: 'ArticleTypeEdit',
        hidden: true,
        component: () => import('@/views/article/EditType'),
        meta: {
          title: 'Chỉnh sửa thể loại bài viết',
          roles: [ROLES.SUPER_ADMIN]
        }
      },
      {
        path: 'edit/:id',
        name: 'EditArticle',
        hidden: true,
        component: () => import('@/views/article/Edit'),
        meta: { title: 'Chỉnh sửa bài viết' }
      }
    ]
  },

  {
    path: '/voucher',
    component: AmdinLayout,
    meta: { title: 'Voucher', icon: 'el-icon-s-ticket', roles: [ROLES.ADMIN] },
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
      },
      {
        path: 'edit/:id',
        name: 'EditVoucher',
        hidden: true,
        component: () => import('@/views/voucher/Edit'),
        meta: { title: 'Chỉnh sửa voucher' }
      }
    ]
  },

  {
    path: '/user',
    component: AmdinLayout,
    meta: {
      title: 'Quản lý chủ sân',
      icon: 'el-icon-s-custom',
      roles: [ROLES.SUPER_ADMIN]
    },
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
  },

  {
    path: '*',
    redirect: '/manage',
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
