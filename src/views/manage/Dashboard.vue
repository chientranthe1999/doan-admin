<template lang="html">
  <div class="content-main-container">
    <!-- <h2 class="my-[1em] text-lg font-500">Khoảng thời gian</h2>
    <el-date-picker
      v-model="dateSearch"
      type="daterange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
    />
    <el-button class="btn--green btn ml-[1em]" icon="el-icon-circle-check" @click="onSearch">Tìm kiếm</el-button> -->

    <el-row :gutter="24" class="mt-[2em]">
      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Tổng số đơn hàng
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">{{ orders }}</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="debt" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Số sân đang hoạt động
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">{{ numberPlaceAtive }}</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="debt" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Doanh thu của hệ thống
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">{{ gasFee | formatMoney }}</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="debt" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Số tài khoản khách hàng
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">{{ numberUser | formatNumber }}</p>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="debt" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Số tài khoản khách chủ sân
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">{{ numberOwner }}</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="money" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Tổng doanh thu
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">{{ revenue | formatMoney }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-form label-width="150px" :model="form" style="max-width: 460px">
      <el-form-item label="GasFree">
        <el-input v-model="form.gasFee" />
      </el-form-item>
      <el-form-item label="Ngày trả thưởng">
        <el-input v-model="form.dateRefundMoney" />
      </el-form-item>
      <div class="text-right">
        <el-button class="btn--green btn ml-[1em]" icon="el-icon-circle-check" @click="onEditSystem">
          Thay Đổi
        </el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getAdminDashBoad, getSystemctlConfig, editSystemConfig } from '@/apis/dashboad'
import moment from 'moment'
export default {
  data() {
    return {
      revenue: '',
      orders: '',
      numberPlaceAtive: 0,
      gasFee: '',
      numberUser: '',
      numberOwner: '',
      dateStart: '',
      dateEnd: '',
      ownerActive: '',
      userActive: '',
      dateSearch: [],
      form: {
        gasFee: 0,
        dateRefundMoney: '0'
      }
    }
  },
  async created() {
    const res = await getAdminDashBoad({
      dateStart: '1999/03/10',
      dateEnd: '2500/09/10'
    })
    this.revenue = res.data.revenue
    this.orders = res.data.orders
    this.numberPlaceAtive = res.data.numberPlaceAtive
    this.gasFee = res.data.gasFee
    const systemConfig = await getSystemctlConfig()
    this.form.gasFee = systemConfig.data.gasFee
    this.form.dateRefundMoney = systemConfig.data.dateRefundMoney
    this.numberUser = res.data.users
    this.numberOwner = res.data.owner
  },
  methods: {
    async onSearch() {
      const res = await getAdminDashBoad({
        dateStart: moment(new Date(this.dateSearch[0])).format('YYYY/MM/DD'),
        dateEnd: moment(new Date(this.dateSearch[1])).format('YYYY/MM/DD')
      })
      this.revenue = res.data.revenue
      this.orders = res.data.orders
      this.numberPlaceAtive = res.data.numberPlaceAtive
      this.gasFee = res.data.gasFee
    },

    async onEditSystem() {
      await editSystemConfig(this.form)
      this.$vmess.success('Edit thanh cong')
    }
  }
}
</script>
<style lang=""></style>
