<template lang="html">
  <div class="main-container flex items-center justify-center h-[100vh] relative">
    <div class="w-[520px] mx-auto p-[2em] box-shadow-1 rounded-lg bg-white">
      <p class="uppercase font-bold text-[1.25rem] text-center mb-[2em]">Hệ thống quản lý sân vận động</p>
      <el-form ref="form" :model="form" :rules="rules" auto-complete="off">
        <el-form-item label="Email" prop="email">
          <el-input v-model.trim="form.email" type="email" />
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>

      <el-button type="success" class="w-full" :loading="loading" @click.native.prevent="login">Đăng nhập</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginView',

  data() {
    return {
      loading: false,
      form: {
        password: '',
        email: ''
      },

      rules: {
        email: {
          required: true,
          message: 'Email không được bỏ trống',
          trigger: 'blur'
        },

        password: {
          required: true,
          message: 'Password không được bỏ trống',
          trigger: 'blur'
        }
      }
    }
  },

  methods: {
    async login() {
      try {
        this.loading = true
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          await this.$store.dispatch('user/login', {
            email: this.form.email,
            password: this.form.password
          })

          this.$router.push('/')
          this.$vmess.success('Đăng nhập thành công')
        }
      } catch (e) {
        this.$vmess.error('Tài khoản hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="css" scoped>
::v-deep .el-form-item__label {
  font-weight: 600;
}

.main-container {
  margin-left: 0 !important;
  background: url('../../assets/login-bg.jpg') no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
