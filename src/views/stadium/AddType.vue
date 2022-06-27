<template lang="html">
  <div>
    <v-header title-text="Thêm loại sân mới" title-icon="el-icon-notebook-1" />
    <div class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="Loại loại sân" prop="name">
            <el-input v-model="form.name" class="w-100" maxlength="200" show-word-limit placeholder="Loại sân mới" />
          </el-form-item>
        </el-form>

        <div class="mb-1-em">
          <p class="mb-[1em]">Ảnh loại sân mới</p>

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
import { createPlaceType } from '@/apis/place'
export default {
  data() {
    return {
      form: {
        name: '',
        image: ''
      },
      fileList: [],

      rules: {
        name: [
          {
            required: true,
            message: 'Vui lòng nhập tên loại sân',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    async onSumit() {
      try {
        await this.$refs.form.validate()
        await createPlaceType(this.form)
        this.$vmess.success('Tạo loại sân thành công')
        this.$router.push('/stadium')
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
