<template lang="html">
  <div class="main-container flex items-center justify-center h-[100vh] relative">
    <div class="w-[520px] mx-auto p-[2em] box-shadow-1 rounded-lg bg-white">
      <p class="uppercase font-bold text-[1.25rem] text-center mb-[2em]">Hệ thống quản lý sân vận động</p>
      <el-form>
        <el-form-item label="Email">
          <el-input />
        </el-form-item>

        <el-form-item label="Mật khẩu"> <el-input /> </el-form-item>
      </el-form>

      <el-button type="success" class="w-full">Đăng nhập</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginView'
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
