<template lang="html">
  <div>
    <v-header :has-button="false" title-icon="comment" :button-text="$t('button.add')" title-text="Comment" />

    <div class="content-main-container">
      <div class="box-shadow-2 bg-white rounded-md p-[1em]">
        <el-form>
          <el-form-item label="Sân" :inline="true">
            <el-select class="w-[240px]">
              <el-option>Chọn sân của bạn</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="bg-white">
          <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
            <template slot="status">
              <div class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">Active</div>
            </template>
            <template slot="action">
              <div class="text-center">
                <el-button type="primary" icon="el-icon-check" circle />
                <el-button type="danger" icon="el-icon-minus" circle />
                <!-- <el-button type="success" icon="el-icon-edit" circle /> -->
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
      total: 30,
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
          label: 'Người đăng',
          minWidth: '20'
        },
        {
          prop: 'comment',
          label: 'Nội dung',
          minWidth: '35'
        },
        {
          prop: 'star',
          label: 'Star',
          minWidth: '10'
        },
        {
          prop: 'created_date',
          label: 'Ngày đăng',
          minWidth: '10'
        },
        {
          prop: 'stadium',
          label: 'Sân',
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
<style lang="scss"></style>
