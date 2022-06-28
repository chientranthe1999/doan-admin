<template lang="html">
  <div>
    <v-header
      :has-button="false"
      title-icon="debt"
      :button-text="$t('button.add')"
      title-text="Quản lý công nợ"
      @buttonClick="$router.push({ name: 'UserAdd' })"
    />

    <div class="content-main-container">
      <div class="bg-white box-shadow-1 p-[0.5em] rounded-md">
        <div class="p-[1em] rounded-sm mb-[1em] flex items-center">
          <p class="text-md uppercase">Tổng số tiền cần thanh toán với chủ sân</p>
          <p class="ml-[auto] text-lg font-bold text-[#e84c3d]">125.000.000đ</p>
        </div>
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
    </div>
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
          name: 'Thắng Dp',
          phone: '12345678',
          status: 'Active'
        }
      ],

      cols: [
        {
          prop: 'name',
          label: 'Tên chủ sân',
          minWidth: '20'
        },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15'
        },
        {
          prop: 'debt',
          label: 'Số tiền đang nợ',
          minWidth: '10'
        },
        {
          prop: 'status',
          label: 'Trạng thái',
          minWidth: '10'
        },
        {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '10'
        }
      ]
    }
  }
}
</script>
<style lang=""></style>
