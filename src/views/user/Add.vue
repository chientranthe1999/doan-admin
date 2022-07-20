<template lang="html">
  <div>
    <v-header title-text="Thêm mới chủ sân" title-icon="user" />
    <div class="content-main-container">
      <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto">
        <el-form ref="form" label-position="top" :model="form" :rules="rules">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Họ và tên" prop="name">
                <el-input v-model="form.name" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Số điện thoại" prop="phone">
                <el-input v-model="form.phone" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Email" prop="email">
                <el-input v-model="form.email" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-row :gutter="24">
                <el-col :sm="12" :xs="12" :md="12" :lg="12">
                  <el-form-item label="Password" prop="password">
                    <el-input v-model="form.password" class="w-full" type="password" />
                  </el-form-item>
                </el-col>

                <el-col :sm="12" :xs="12" :md="12" :lg="12">
                  <el-form-item label="Nhập lại password" prop="password_confirm">
                    <el-input v-model="form.password_confirm" type="password" class="w-full" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Số tài khoản" prop="stk">
                <el-input v-model="form.stk" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Ngân hàng (SymBol)" prop="bankSymbol">
                <el-input v-model="form.bankSymbol" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Địa chỉ" prop="address">
                <el-input v-model="form.address" class="w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-right mt-1-em">
            <el-button class="btn--green btn" icon="el-icon-circle-check" @click="onSubmitCreaterOwnerPlace">
              Thêm mới
            </el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
import { register } from '../../apis/auth'
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        address: '',
        password: '',
        password_confirm: '',
        stk: '',
        bankSymbol: ''
      },

      rules: {
        name: {
          required: true,
          message: 'Vui lòng nhập tên chủ sân',
          trigger: 'blur'
        },
        phone: {
          required: true,
          message: 'Vui lòng nhập vào số điện thoại',
          trigger: 'blur'
        },
        email: {
          required: true,
          message: 'Vui lòng nhập email',
          trigger: 'blur'
        },
        address: {
          required: true,
          message: 'Vui lòng nhập vào địa chỉ',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: 'Vui lòng nhập password',
          trigger: 'blur'
        },
        password_confirm: {
          required: true,
          message: 'Vui lòng nhập lại password',
          trigger: 'blur'
        },
        stk: {
          required: true,
          message: 'Vui lòng nhập vào số tài khoản',
          trigger: 'blur'
        },
        bankSymbol: {
          required: true,
          message: 'Vui lòng nhập vào tên ngân hàng',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    async onSubmitCreaterOwnerPlace() {
      try {
        await this.$refs.form.validate()
        const ownerPlace = {
          email: this.form.email,
          password: this.form.password,
          role: 2,
          ownerPlace: {
            address: this.form.address,
            phone: this.form.phone,
            stk: this.form.stk,
            bankSymbol: this.form.bankSymbol,
            fullName: this.form.name
          }
        }
        await register(ownerPlace)
        this.$vmess.success('Tạo chủ sân thành công')
        this.$router.push('/user')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss"></style>
