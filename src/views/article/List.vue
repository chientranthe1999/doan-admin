<template lang="html">
  <div v-loading.fullscreen.lock="loading">
    <v-header
      :has-button="true"
      button-text="Thêm mới"
      title-text="Danh sách bài viết"
      title-icon="stadium"
      @buttonClick="$router.push({ name: 'ArticleAdd' })"
    />
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
                    @click="$router.push({ name: 'EditArticle', params: { id: row.id } })"
                  />
                  <!-- <el-button type="primary" icon="el-icon-right" circle /> -->
                </div>
              </template>

              <template #image="{ row }">
                <div class="p-[8px]">
                  <el-image v-if="row.image" class="w-full mb-4" :src="row.image" lazy fit="cover" />
                </div>
              </template>

              <template #type="{ row }">
                <div class="text-center">
                  <el-tag class="rounded-full mb-1">{{ row.type }}</el-tag>
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
import { getAllArticle } from '@/apis/article'
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
          prop: 'title',
          label: 'Tiêu đề',
          minWidth: '200'
        },
        {
          prop: 'image',
          label: 'Ảnh minh họa',
          minWidth: '120'
        },
        {
          prop: 'type',
          label: 'Thể loại',
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
    const a = await this.getNews()
  },

  methods: {
    async getNews() {
      try {
        const res = await getAllArticle({
          page: this.page,
          pageSize: this.limit
        })
        this.results = res.data.data.records.map((item) => {
          return {
            id: item.id,
            name: item.name,
            image: item.image,
            title: item.title,
            type: item.typeArticle.title
          }
        })

        this.total = res.data.data.total
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
