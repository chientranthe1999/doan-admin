<template lang="html">
  <div v-loading.fullscreen.lock="loading">
    <v-header
      :has-button="true"
      button-text="Thêm mới"
      title-text="Danh sách sân vận động"
      title-icon="stadium"
      @buttonClick="$router.push({ name: 'StadiumAdd' })"
    />
    <main class="content-main-container">
      <!-- Result data -->
      <section>
        <div class="d-flex align-items-center mb-[1em]">
          <v-limiter @handleChange="limitChange" />
        </div>
        <div class="box-shadow-bordered pd-1-em bordered-5">
          <template v-if="results.length > 0">
            <div class="mb-1-em text-right">
              <el-button icon="el-icon-printer" class="btn btn--green" round :disabled="disabledPrintButton">{{
                $t('button.invoice')
              }}</el-button>
              <el-button icon="el-icon-download" class="btn btn--blue" round :disabled="disabledPrintButton">{{
                $t('button.download')
              }}</el-button>
            </div>
            <v-table
              :table-data="results"
              :columns="cols"
              :limit="limit"
              :page="page"
              :total="total"
              col-type="selection"
            >
              <!-- @handleSelectionChange="handleSelectionChange" -->
              <template slot="shared_code" slot-scope="{ row }">
                <div v-for="code in row.shared_code" :key="`${code}-share-code`">{{ code }}</div>
              </template>

              <template slot="action" slot-scope="{ row }">
                <div class="text-center">
                  <el-button type="success" icon="el-icon-edit" circle />
                  <el-button type="primary" icon="el-icon-right" circle />
                </div>
              </template>
            </v-table>
          </template>

          <el-empty v-else description="Không có kết quả" />
        </div>
      </section>
    </main>

    <v-printer />
  </div>
</template>

<script>
import { HTTP_STATUS } from '@/utils/constants.js'

export default {
  name: 'StadiumList',
  data() {
    return {
      filters: {
        car_id: undefined,
        keywords: undefined
      },
      selectedItems: [],
      loading: false,
      results: [],

      cols: [
        {
          prop: 'code',
          label: this.$t('label.code'),
          minWidth: '120'
        },
        {
          prop: 'shared_code',
          label: this.$t('label.shared_code'),
          minWidth: '120'
        },
        {
          prop: 'name',
          label: this.$t('label.name'),
          minWidth: '220'
        },
        {
          prop: 'en_name',
          label: this.$t('label.en_name'),
          minWidth: '220'
        },
        {
          prop: 'name_code',
          label: this.$t('label.code_name'),
          minWidth: '120'
        },
        {
          prop: 'car',
          label: this.$t('label.car'),
          minWidth: '120'
        },
        {
          prop: 'provider',
          label: this.$t('label.provider'),
          minWidth: '220'
        },
        {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '120',
          fixed: 'right'
        }
      ]
    }
  },
  computed: {
    currentItems() {
      if (this.total === 0 || !this.results.length) return 0
      return this.total > (this.page + 1) * this.limit
        ? `${(this.page - 1) * this.limit + 1} - ${(this.page + 1) * this.limit}`
        : `${(this.page - 1) * this.limit + 1} - ${this.total}`
    },

    disabledPrintButton() {
      return this.selectedItems.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
.content-main-container {
  padding: 1em;
}
</style>
