<template lang="html">
  <div>
    <v-header
      title-text="Danh sách voucher"
      button-text="Thêm mới"
      title-icon="voucher"
      :has-button="true"
      @buttonClick="$router.push({ name: 'VoucherAdd' })"
    />

    <main class="content-main-container">
      <el-row :gutter="12" class="box-shadow-1 rounded-sm py-[1rem] min-h-[80vh]">
        <el-col v-for="i in 4" :key="i" :xs="24" :sm="12" :md="12" :lg="6">
          <div class="flex mx-auto w-fit mb-[1.5em] cursor-pointer hover:opacity-70">
            <div class="card card-right rounded-l-md overflow-hidden">
              <p class="bg-[#00b5ad] text-center py-[4px] text-[white]">Thông tin</p>
              <div class="p-[0.5em] min-h-[90px]">
                <p class="font-bold">Giảm 5%</p>
                <p class="font-400 text-xs">Đơn tối thiểu 100k, giảm tối đa 20k</p>
                <p class="font-400 text-xs">Địa điểm áp dụng: Sân vận động Mỹ Đình</p>
              </div>
            </div>

            <div class="card card-left rounded-r-md min-w-[100px] text-center flex-col">
              <p class="bg-[#00b5ad] rounded-tr-md py-[4px] text-[white]">Số lượng</p>
              <p class="flex-grow py-[1.5em]">20</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>
<script>
export default {
  name: 'VoucherList'
}
</script>
<style lang="scss">
$red: #e84c3d;
$grey: #ecedef;
$black: #343434;
$main: #00b5ad;
$green: #21ba45;
$blue: #2185d0;

.w-fit {
  width: fit-content;
}

.card {
  background: linear-gradient(to bottom, $grey 26%, $grey 100%);
  position: relative;
}

.card-left {
  border-left: 0.18em dashed #fff;
  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 0.9em;
    height: 0.9em;
    background: #fff;
    border-radius: 50%;
    left: -0.5em;
  }
  &:before {
    top: -0.4em;
  }
  &:after {
    bottom: -0.4em;
  }
}
</style>
