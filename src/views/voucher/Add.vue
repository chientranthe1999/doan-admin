<template lang="html">
  <div>
    <v-header title-text="Thêm mới voucher" title-icon="voucher" />
    <div class="content-main-container">
      <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto">
        <el-form label-position="top">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Chọn địa điểm áp dụng voucher">
                <el-select class="w-full">
                  <el-option>Chọn sân</el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Số lượng voucher">
                <el-input class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-row :gutter="24">
                <el-col :sm="18" :xs="18" :md="18" :lg="18">
                  <el-form-item label="Giảm giá">
                    <el-input class="w-full" />
                  </el-form-item>
                </el-col>

                <el-col :sm="6" :xs="6" :md="6" :lg="6">
                  <el-form-item label="Đơn vị">
                    <el-select class="w-full">
                      <el-option>%</el-option>
                      <el-option>VNĐ</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Điều kiện áp dụng voucher">
                <el-input class="w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-right mt-1-em">
            <el-button class="btn--green btn" icon="el-icon-circle-check">Save</el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss"></style>
