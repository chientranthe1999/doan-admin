<template lang="html">
  <div>
    <v-header title-text="Thêm bài viết mới" title-icon="el-icon-notebook-1" />
    <div class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="Tiêu đề bài viết" prop="title">
            <el-input v-model="form.title" class="w-100" maxlength="200" show-word-limit placeholder="Tiêu đề" />
          </el-form-item>
          <el-form-item label="Chọn loại bài viết">
            <el-select
              :value="form.typeArticle.title"
              class="w-full"
              filterable
              placeholder="Chọn loại bài viết"
              @change="onChangeType"
            >
              <el-option v-for="item in typeArticles" :key="item.id" :label="item.title" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="Trạng thái">
            <el-radio-group v-model="form.isActive">
              <el-radio :label="1">Active</el-radio>
              <el-radio :label="0">Disable</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Tóm tắt nội dung" prop="title">
            <el-input v-model="form.description" class="w-100" maxlength="200" show-word-limit placeholder="Tiêu đề" />
          </el-form-item>
        </el-form>

        <p class="mb-3">Nội dung bài viết</p>
        <v-editor v-model="form.content" class="mb-[1em]" />
        <div class="mb-1-em">
          <p class="mb-[1em]">Ảnh chi tiết</p>

          <!-- :on-preview="handlePreview"
						:on-remove="handleRemove" -->
          <el-upload
            class="upload-demo"
            action="https://apis.datsan.xyz/upload/s3"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="false"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </div>

        <div class="text-right mt-1-em">
          <el-button class="btn--orange btn" icon="el-icon-circle-close">Cancel</el-button>
          <el-button class="btn--green btn" icon="el-icon-circle-check" @click="onSubmit">Save</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTypeArticle, editArticle, getArticleById } from '../../apis/article'
export default {
  data() {
    return {
      fileList: [],
      typeArticles: [],
      typeArticle: {},
      form: {
        content: '',
        title: '',
        typeArticle: {},
        image: '',
        isActive: 0
      },
      rules: {
        title: [
          {
            required: true,
            message: 'Vui lòng nhập tiêu đề bài viết',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: 'Vui lòng nhập nội dung bài viết',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async created() {
    const article = await getArticleById(this.$route.params.id)

    this.form.title = article.data.data.title
    this.form.description = article.data.data.title
    this.form.typeArticle = article.data.data.typeArticle
    this.form.content = article.data.data.content
    this.form.isActive = article.data.data.isActive
  },
  async mounted() {
    this.typeArticles = await (await getTypeArticle()).data.data
  },
  methods: {
    onChangeType(typeArticle) {
      this.form.typeArticle = typeArticle
    },
    async onSubmit() {
      try {
        await this.$refs.form.validate()

        await editArticle(this.$route.params.id, this.form)
        this.$vmess.success('Chỉnh sửa thành công')
        this.$router.push('/article')
      } catch (e) {
        console.error(e)
      }
    },
    handleUploadSuccess(e) {
      this.form.image = e.data
    }
  }
}
</script>
<style lang=""></style>
