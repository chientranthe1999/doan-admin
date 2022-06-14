<template lang="html">
  <div v-loading="loading">
    <v-header title-text="Thêm sân mới" title-icon="stadium" />
    <main class="content-main-container">
      <!-- main form -->
      <section class="bordered-5 bg--gray pd-1-em">
        <el-form ref="form" class="bordered-5" :rules="rules" :model="part">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="16" :xl="16" class="mb-1-em">
              <div class="box-shadow-1 bordered-5 bg--white pd-1-em">
                <el-row :gutter="12">
                  <!-- Stadium type -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex">
                    <el-form-item label="Loại sân" prop="company_id" class="flex-1">
                      <el-select v-model="part.company_id" class="w-100" @change="getCarOptions(part.company_id)">
                        <el-option
                          v-for="company in companies"
                          :key="company.id"
                          label="company.name"
                          :value="company.id"
                        />
                      </el-select>
                    </el-form-item>
                    <div class="w-[40px] h-[40px] pt-[46px] text-[1.5em] text-center" @click="isOpenType = true">
                      <v-icon icon-class="plus" class="cursor-pointer hover:opacity-80" />
                    </div>
                  </el-col>

                  <!-- car -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Tên sân" prop="car_id">
                      <el-input
                        v-model="part.code"
                        class="w-100"
                        maxlength="100"
                        show-word-limit
                        placeholder="Nhập vào tên sân"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- Address -->
                <el-form-item label="Địa chỉ" prop="code">
                  <el-input v-model="part.code" class="w-100" maxlength="500" show-word-limit placeholder="Địa chỉ" />
                </el-form-item>

                <!-- More infor -->
                <el-form-item label="Thông tin thêm" prop="name">
                  <el-input v-model="part.name" class="w-100" maxlength="500" show-word-limit />
                </el-form-item>

                <el-row :gutter="12">
                  <!-- Open time -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Giờ mở cửa" prop="company_id">
                      <el-input v-model="part.code" class="w-100" maxlength="10" show-word-limit />
                    </el-form-item>
                  </el-col>
                  <!-- Close time -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Giờ đóng cửa" prop="car_id">
                      <el-input v-model="part.code" class="w-100" maxlength="10" show-word-limit />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- Rent price -->
                <el-form-item label="Giá thuê" prop="shared_code">
                  <el-input v-model="part.shared_codes" class="w-100" maxlength="12" show-word-limit />
                </el-form-item>

                <!-- Limit people -->
                <el-form-item label="Số người tối đa trên sân">
                  <el-input v-model="part.shared_codes" class="w-100" maxlength="10" show-word-limit />
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :xl="8">
              <!-- Ảnh Banner -->
              <div class="box-shadow-1 bordered-5 bg--white pd-1-em mb-1-em">
                <p class="mb-[1em]">Ảnh banner</p>
                <div>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture"
                    :auto-upload="false"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </div>
              </div>

              <div class="box-shadow-1 bordered-5 bg--white pd-1-em mb-1-em">
                <p class="mb-[1em]">Ảnh chi tiết</p>
                <div>
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture"
                    :auto-upload="false"
                  >
                    <el-button size="small" type="primary">Click to upload</el-button>
                    <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
                  </el-upload>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-right mt-1-em">
          <el-button class="btn--orange btn" icon="el-icon-circle-close">Cancel</el-button>
          <el-button class="btn--green btn" icon="el-icon-circle-check">Save</el-button>
        </div>
      </section>
    </main>

    <!-- dialog add new place type -->
    <el-dialog title="Tạo loại sân mới" :visible.sync="isOpenType">
      <el-form :model="form">
        <el-form-item label="Loại sân">
          <el-input v-model="form.name" autocomplete="off" show-word-limit maxlength="50" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isOpenType = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      providers: [],
      companies: [],
      rules: {},
      cars: [],
      value1: undefined,
      fileList: [],
      isOpenType: false,
      form: {},
      part: {
        company_id: undefined,
        car_id: undefined,
        name: undefined,
        code: undefined,
        en_name: undefined,
        code_name: undefined,
        shared_codes: undefined,
        shared_cars: [],
        provider_id: undefined,
        images: []
      }
    }
  },
  mounted() {
    console.log('ChienTT')
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      this.fileList.push(file.url)
    }
  }
}
</script>

<style lang="scss" scoped></style>
