<template lang="html">
  <div>
    <v-header
      :has-button="true"
      title-icon="user"
      :button-text="$t('button.add')"
      title-text="Quản lý chủ sân"
      @buttonClick="$router.push({ name: 'UserAdd' })"
    />
    <div class="content-main-container">
      <div class="bg-white">
        <v-table
          :table-data="results"
          :columns="cols"
          :limit="limit"
          :page="page"
          :total="total"
          @onChangePage="changePage"
        >
          <template #approved="{ row }">
            <div
              v-if="row.approved"
              class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto"
            >
              Active
            </div>
            <div v-else class="text-center bg-[#f56c6c] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">
              InActive
            </div>
          </template>
          <template #action="{ row }">
            <div class="text-center">
              <el-button v-if="row.approved" type="danger" icon="el-icon-minus" circle @click="disableAdmin(row.id)" />
              <el-button v-else type="primary" icon="el-icon-check" circle @click="activeAdmin(row.id)" />
              <el-button type="success" icon="el-icon-edit" circle />
            </div>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getOwnerPlaces } from '@/apis/owner-place'
import { activeAdmin, disableAdmin } from '@/apis/auth'
export default {
  data() {
    return {
      listUser: [],
      loading: false,
      total: 1,
      page: 1,
      limit: 20,
      results: [],

      cols: [
        {
          prop: 'fullName',
          label: 'Họ và tên',
          minWidth: '15'
        },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15'
        },
        {
          prop: 'email',
          label: 'Email',
          minWidth: '20'
        },
        {
          prop: 'address',
          label: 'Địa chỉ',
          minWidth: '25'
        },
        {
          prop: 'approved',
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
  },
  async created() {
    await this.getUserList()
  },

  methods: {
    async changePage(page) {
      this.page = page
      await this.getUserList()
    },

    async getUserList() {
      try {
        this.loading = true
        const res = await getOwnerPlaces({
          page: this.page,
          pageSize: this.limit
        })

        this.results = res.data.data.records
        this.total = res.data.data.total
      } catch (e) {
        this.results = []
        this.$vmess.error('Đã có lỗi xảy ra. Vui lòng thử lại')
      } finally {
        this.loading = false
      }
    },

    async activeAdmin(id) {
      try {
        const res = await activeAdmin(id)
        this.$vmess.success('Kích hoạt thành công')
        await this.getUserList()
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra. Vui lòng thử lại')
      }
    },

    async disableAdmin(id) {
      try {
        const res = await disableAdmin(id)
        this.$vmess.success('Hủy kích hoạt thành công')
        await this.getUserList()
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra. Vui lòng thử lại')
      }
    }
  }
}
</script>
<style lang="scss"></style>
