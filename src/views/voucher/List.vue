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
      <el-row v-if="listVoucher.length" :gutter="12" class="box-shadow-1 rounded-sm py-[1rem] min-h-[80vh]">
        <el-col v-for="voucher in listVoucher" :key="voucher.id" :xs="24" :sm="12" :md="12" :lg="12">
          <div
            class="flex mx-auto w-fit mb-[1.5em] cursor-pointer hover:opacity-70"
            @click="onClickVoucher(voucher.id)"
          >
            <div class="card card-right rounded-l-md overflow-hidden">
              <p class="bg-[#00b5ad] text-center py-[4px] text-[white]">Thông tin</p>
              <div class="p-[0.5em] min-h-[90px]">
                <p class="font-bold">{{ voucher.name }}</p>
                <p class="font-400 text-xs">
                  Giảm giá :
                  {{ voucher.type == 0 ? `${voucher.value}%` : `${voucher.value} VND` }}
                </p>
                <p class="font-400 text-xs">Điều kiện áp dụng đơn từ : {{ voucher.moneyCondition }} VND</p>
                <p class="font-400 text-xs">Giảm tối đa : {{ voucher.moneyCondition }} VND</p>
                <p class="font-400 text-xs">Ngày hết hạn: {{ voucher.endDate }}</p>
                <p v-if="voucher.place" class="font-400 text-xs">
                  Địa điểm áp dụng: {{ voucher.place.name || '' }}-
                  {{ voucher.place.address || '' }}
                </p>
              </div>
            </div>

            <div class="card card-left rounded-r-md min-w-[100px] text-center flex-col">
              <p class="bg-[#00b5ad] rounded-tr-md py-[4px] text-[white]">Số lượng</p>
              <p class="flex-grow py-[1.5em]">{{ voucher.amount }}</p>
            </div>
            <div class="card card-left rounded-r-md min-w-[100px] text-center flex-col">
              <p class="bg-[#00b5ad] rounded-tr-md py-[4px] text-[white]">Trạng thái</p>
              <p class="flex-grow py-[1.5em]">
                {{ voucher.isActive ? 'Đang áp dụng' : 'Không áp dụng' }}
              </p>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-empty v-else />
    </main>
  </div>
</template>
<script>
import { getVoucher } from '../../apis/voucher'
export default {
  name: 'VoucherList',
  data() {
    return {
      listVoucher: []
    }
  },

  async mounted() {
    const dataVoucher = await getVoucher()
    this.listVoucher = dataVoucher.data.data.records
    console.log(dataVoucher.data.data.records)
    console.log(this.listVoucher)
  },
  methods: {
    onClickVoucher(id) {
      this.$router.push(`/voucher/edit/${id}`)
    }
  }
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
