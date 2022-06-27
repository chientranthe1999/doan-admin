<template lang="html">
  <div v-loading.fullscreen.lock="loading">
    <v-header
      :has-button="true"
      button-text="Thêm mới"
      title-text="Danh sách Loại Sân"
      @buttonClick="$router.push({ name: 'StadiumTypeAdd' })"
    />
    <!-- title-icon="stadium" -->
    <main class="content-main-container">
      <!-- Result data -->
      <section>
        <div class="box-shadow-bordered pd-1-em bordered-5">
          <template v-if="results.length > 0">
            <div class="mb-1-em text-right" />
            <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
              <template #action="{ row }">
                <div class="text-center">
                  <el-button
                    type="success"
                    icon="el-icon-edit"
                    circle
                    @click="$router.push({ name: 'ArticleTypeEdit', params: { id: row.id } })"
                  />
                  <!-- <el-button type="primary" icon="el-icon-right" circle /> -->
                </div>
              </template>

              <template #image="{ row }">
                <div class="p-[8px]">
                  <el-image v-if="row.image" class="w-full mb-4" :src="row.image" lazy fit="cover" />
                </div>
              </template>
            </v-table>
          </template>

          <el-empty v-else description="Không có kết quả" />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { getPlaceType } from '@/apis/place'
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
          label: 'Loại sân',
          minWidth: '200'
        },
        {
          prop: 'image',
          label: 'Ảnh minh họa',
          minWidth: '120'
        },

        {
          prop: 'action',
          label: '',
          minWidth: '60'
        }
      ]
    }
  },

  async created() {
    await this.getPlaceType()
  },

  methods: {
    async getPlaceType() {
      try {
        const res = await getPlaceType({
          page: this.page,
          pageSize: this.limit
        })

        // this.results = res.data.data.records.map((item) => {
        //   return {
        //     id: item.id,
        //     name: item.name,
        //     image: item.image,
        //     title: item.title,
        //     type: item.typeArticle.title
        //   }
        // })

        // this.total = res.data.data.total
        this.results = res.data.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-main-container {
  padding: 1em;
}
</style>
