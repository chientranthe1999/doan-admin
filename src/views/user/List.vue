<template lang="">
  <div>
    <v-header
      :has-button="true"
      :button-text="$t('button.add')"
      :title-text="$t('title.user_list')"
      @buttonClick="isOpen = true"
    />

    <div class="content-main-container">
      <div class="content-main-container">
        <div class="bg-white">
          <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
            <template slot="action" slot-scope="{ row }">
              <div class="text-center">
                <el-button type="success" icon="el-icon-edit" circle />
                <el-button type="danger" icon="el-icon-delete" circle />
              </div>
            </template>
          </v-table>
          <UserInput :title="$t('title.device_add')" :is-open.sync="isOpen" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserInput from './UserInput.vue'
export default {
  components: {
    UserInput
  },
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      results: [
        {
          device: 'ThietBi1',
          location: 'Hihi',
          type: 'esp32'
        }
      ],

      cols: [
        {
          prop: 'email',
          label: this.$t('label.email'),
          minWidth: '20'
        },
        {
          prop: 'name',
          label: this.$t('label.name'),
          minWidth: '20'
        },
        {
          prop: 'phone',
          label: this.$t('label.phone'),
          minWidth: '20'
        },
        {
          prop: 'role',
          label: this.$t('label.role'),
          minWidth: '15'
        },
        {
          prop: 'status',
          label: this.$t('label.status'),
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
