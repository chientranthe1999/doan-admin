<template lang="html">
  <div>
    <v-header :has-button="false" title-icon="booking" :button-text="$t('button.add')" title-text="Quản lý đơn hàng" />

    <main class="content-main-container">
      <div class="box-shadow bg-white rounded-lg p-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem]">
          <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
          <div>
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em]">Tổng số đơn hàng</p>
            <p class="text-center text-[#00b5ad] text-[30px]">86</p>
          </div>
        </div>

        <h2 class="my-[1em] text-lg font-500">Thông tin chi tiết</h2>

        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
          <template slot="status">
            <div class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">
              Đã thanh toán
            </div>
          </template>
          <template slot="action">
            <div class="text-center">
              <el-button type="primary" icon="el-icon-check">Pay</el-button>
            </div>
          </template>
        </v-table>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      gas: 10,
      results: [
        {
          station: 'Sân Nam Từ Liêm',
          name: 'Thằng DP',
          phone: '12345678',
          time: '13:30 23/12/2021',
          created_at: '23/12/2021'
        }
      ],

      cols: [
        {
          prop: 'station',
          label: 'Sân',
          minWidth: '20'
        },
        {
          prop: 'name',
          label: 'Người đặt vé',
          minWidth: '15'
        },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15'
        },
        {
          prop: 'time',
          label: 'Thời gian sử dụng',
          minWidth: '15'
        },
        {
          prop: 'money',
          label: 'Số tiền',
          minWidth: '10'
        },

        {
          prop: 'created_at',
          label: 'Ngày đặt',
          minWidth: '10'
        }
      ]
    }
  }
}
</script>
<style lang=""></style>
