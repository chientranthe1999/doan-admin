<template lang="html">
  <div class="content-main-container">
    <el-row :gutter="24">
      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Tổng số đơn hàng
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">86</p>
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
          <v-icon icon-class="debt" class="text-[80px] mr-[8px]" />
          <div class="overflow-hidden flex-1 text-center">
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">
              Tổng nợ
            </p>
            <p class="text-center text-[#00b5ad] text-[24px]">125.000.000đ</p>
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
            <p class="text-center text-[#00b5ad] text-[24px]">12.000.000đ</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
