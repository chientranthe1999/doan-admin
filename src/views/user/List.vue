<template lang="">
  <div>
    <v-header
      :has-button="true"
      title-icon="user"
      :button-text="$t('button.add')"
      title-text="Quản lý chủ sân"
      @buttonClick="$router.push({ name: 'UserAdd' })"
    />

    <div class="content-main-container">
      <div class="content-main-container">
        <div class="bg-white">
          <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
            <template slot="status">
              <div class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">Active</div>
            </template>
            <template slot="action">
              <div class="text-center">
                <el-button type="primary" icon="el-icon-check" circle />
                <el-button type="danger" icon="el-icon-minus" circle />
                <el-button type="success" icon="el-icon-edit" circle />
              </div>
            </template>
          </v-table>
        </div>
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
          label: 'Họ và tên',
          minWidth: '20'
        },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15'
        },
        {
          prop: 'email',
          label: 'Email',
          minWidth: '15'
        },
        {
          prop: 'address',
          label: 'Địa chỉ',
          minWidth: '25'
        },
        {
          prop: 'status',
          label: 'Trạng thái',
          minWidth: '10'
        },
        {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '15'
        }
      ]
    }
  }
}
</script>
<style lang="scss"></style>
