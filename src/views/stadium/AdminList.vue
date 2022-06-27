<template lang="html">
  <div v-loading.fullscreen.lock="loading">
    <v-header :has-button="false" button-text="Thêm mới" title-text="Danh sách sân vận động" title-icon="stadium" />
    <main class="content-main-container">
      <!-- Result data -->
      <section>
        <div class="box-shadow-bordered pd-1-em bordered-5">
          <template v-if="results.length">
            <div class="mb-1-em text-right" />
            <v-table
              :table-data="results"
              :columns="cols"
              :limit="limit"
              :page="page"
              :total="total"
              @onChangePage="onChangePage"
            >
              <!-- @handleSelectionChange="handleSelectionChange" -->
              <template slot="shared_code" slot-scope="{ row }">
                <div v-for="code in row.shared_code" :key="`${code}-share-code`">{{ code }}</div>
              </template>

              <!-- <template #action="{ row }">
                <div class="text-center">
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    circle
                    @click="$router.push({ name: 'StadiumEdit', params: { id: row.id } })"
                  />
                  <el-button type="primary" icon="el-icon-right" circle />
                </div>
              </template> -->
            </v-table>
          </template>

          <el-empty v-else description="Không có kết quả" />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { getAllPlace } from '@/apis/place'

export default {
  name: 'StadiumList',
  data() {
    return {
      loading: false,
      total: 1,
      page: 1,
      limit: 20,
      results: [],

      cols: [
        {
          prop: 'name',
          label: 'Tên sân',
          minWidth: '120'
        },
        {
          prop: 'address',
          label: 'Địa chỉ',
          minWidth: '120'
        },
        {
          prop: 'timeOpen',
          label: 'Giờ mở cửa',
          minWidth: '120'
        },
        {
          prop: 'timeClose',
          label: 'Giờ đóng cửa',
          minWidth: '120'
        }
      ]
    }
  },

  async created() {
    await this.getPlace()
  },

  methods: {
    async getPlace() {
      try {
        const res = await getAllPlace({
          page: this.page,
          pageSize: this.limit
        })
        this.results = res.data.data.records
        this.total = res.data.data.total
      } catch (error) {
        console.log(error)
      }
    },

    async onChangePage(page) {
      this.page = page
      await this.getPlace()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-main-container {
  padding: 1em;
}
</style>
