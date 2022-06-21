<template lang="html">
  <div>
    <v-header title-text="Thêm mới chủ sân" title-icon="user" />
    <div class="content-main-container">
      <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto">
        <el-form label-position="top" :model="form">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Họ và tên">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Số điện thoại">
                <el-input v-model="form.phone" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Email">
                <el-input v-model="form.email" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-row :gutter="24">
                <el-col :sm="12" :xs="12" :md="12" :lg="12">
                  <el-form-item label="Password">
                    <el-input v-model="form.password" class="w-full" type="password" />
                  </el-form-item>
                </el-col>

                <el-col :sm="12" :xs="12" :md="12" :lg="12">
                  <el-form-item v-model="form.password_confirm" label="Nhập lại password" type="password">
                    <el-input class="w-full" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Địa chỉ">
                <el-input v-model="form.address" class="w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-right mt-1-em">
            <el-button class="btn--green btn" icon="el-icon-circle-check">Thêm mới</el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        password_confirm: ''
      }
    }
  }
}
</script>
<style lang="scss"></style>
