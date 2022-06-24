<template lang="html">
  <div>
    <v-header title-text="Thêm loại bài viết" title-icon="el-icon-notebook-1" />
    <div class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form :model="form" :rules="rules">
          <el-form-item label="Tiêu đề bài viết" prop="title">
            <el-input
              v-model="form.title"
              class="w-100"
              maxlength="200"
              show-word-limit
              placeholder="Tiêu đề"
            />
          </el-form-item>
        </el-form>

        <div class="mb-1-em">
          <p class="mb-[1em]">Ảnh chi tiết</p>

          <!-- :on-preview="handlePreview"
						:on-remove="handleRemove" -->
          <el-upload
            class="upload-demo"
            action="https://apis.datsan.xyz/upload/s3"
            :file-list="fileList"
            list-type="picture"
            :auto-upload="true"
            :on-success="handleUploadSuccess"
            :multiple="true"
            :limit="1"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
            <div slot="tip" class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </el-upload>
        </div>

        <div class="text-right mt-1-em">
          <el-button
            class="btn--orange btn"
            icon="el-icon-circle-close"
          >Cancel</el-button>
          <el-button
            class="btn--green btn"
            icon="el-icon-circle-check"
            @click="onSumit"
          >Save</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTypeArticle, creaetArticleType } from '../../apis/article'
export default {
  data() {
    return {
      form: {
        title: '',
        image: ''
      },
      fileList: [],
      typeArticles: [],
      typeArticle: {},
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
  async mounted() {
    this.typeArticles = await (await getTypeArticle()).data.data
    console.log(this.typeArticles)
  },
  methods: {
    onChangeType(typeArticle) {
      this.typeArticle = typeArticle
    },
    async onSumit() {
      const res = await creaetArticleType(this.form)
      this.$vmess.success('Tạo loại bài viết thành công')
      this.$router.push('/article')
    },
    handleUploadSuccess(e) {
      this.form.image = e.data
    }
  }
}
</script>
<style lang=""></style>
