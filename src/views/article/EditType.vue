<template lang="html">
  <div>
    <v-header title-text="Chỉnh sửa loại bài viết" title-icon="el-icon-notebook-1" />
    <div class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="Loại bài viết" prop="title">
            <el-input v-model="form.title" class="w-100" maxlength="200" show-word-limit placeholder="Loại bài viết" />
          </el-form-item>
        </el-form>

        <div class="mb-1-em">
          <p class="mb-[1em]">Ảnh loại bài viêt</p>

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
            <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
        </div>

        <div class="text-right mt-1-em">
          <el-button class="btn--orange btn" icon="el-icon-circle-close">Cancel</el-button>
          <el-button class="btn--green btn" icon="el-icon-circle-check" @click="onSumit">Save</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTypeArticle, creaetArticleType } from '@/apis/article'
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
            message: 'Vui lòng nhập tên loại bài viết',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    onChangeType(typeArticle) {
      this.typeArticle = typeArticle
    },
    async onSumit() {
      try {
        await this.$refs.form.validate()
        await creaetArticleType(this.form)
        this.$vmess.success('Tạo loại bài viết thành công')
        this.$router.push('/article')
      } catch (e) {
        console.log(e)
      }
    },

    handleUploadSuccess(e) {
      this.form.image = e.data
    }
  }
}
</script>
<style lang=""></style>
