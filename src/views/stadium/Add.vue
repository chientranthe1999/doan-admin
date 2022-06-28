<template lang="html">
  <div v-loading="loading">
    <v-header title-text="Thêm sân mới" title-icon="stadium" />
    <main class="content-main-container">
      <!-- main form -->
      <section class="bordered-5 bg--gray pd-1-em">
        <el-form ref="form" class="bordered-5" :rules="rules" :model="form">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="16" :xl="16" class="mb-1-em">
              <div class="box-shadow-1 bordered-5 bg--white pd-1-em">
                <el-row :gutter="12">
                  <!-- Stadium type -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex">
                    <el-form-item label="Loại sân" prop="typePlace" class="flex-1">
                      <el-select v-model="form.typePlace" class="w-100">
                        <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <!-- name -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Tên sân" prop="name">
                      <el-input
                        v-model="form.name"
                        class="w-100"
                        maxlength="100"
                        show-word-limit
                        placeholder="Nhập vào tên sân"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="12">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Chọn Tỉnh/Thành Phố">
                      <el-select
                        ref="city"
                        v-model="cityCode"
                        placeholder="Chọn Tỉnh/Thành phố"
                        class="w-full"
                        clearable
                        @change="onCityChange"
                      >
                        <el-option
                          v-for="(city, i) in cities"
                          :key="'city' + i"
                          :value="city.code"
                          :label="city.name_with_type"
                        >
                          {{ city.name_with_type }}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Chọn Quận/Huyện">
                      <el-select
                        ref="district"
                        v-model="districtCode"
                        placeholder="Chọn Quận/Huyện"
                        class="w-full"
                        :disabled="!cityCode"
                        clearable
                      >
                        <el-option
                          v-for="(item, i) in districts"
                          :key="'district' + i"
                          :value="item.code"
                          :label="item.name_with_type"
                        >
                          {{ item.name_with_type }}
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- Address -->
                <el-form-item label="Địa chỉ" prop="address">
                  <el-input
                    v-model="form.address"
                    class="w-100"
                    maxlength="500"
                    show-word-limit
                    placeholder="Địa chỉ"
                  />
                </el-form-item>

                <!-- More infor -->
                <el-form-item label="Thông tin thêm" prop="description">
                  <el-input
                    v-model="form.description"
                    class="w-100"
                    maxlength="1000"
                    show-word-limit
                    type="textarea"
                    rows="4"
                  />
                </el-form-item>

                <el-row :gutter="12">
                  <!-- Open time -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Giờ mở cửa" prop="timeOpen">
                      <el-time-select
                        v-model="form.timeOpen"
                        class="w-full"
                        :picker-options="timeOptions"
                        placeholder="Select time"
                      />
                    </el-form-item>
                  </el-col>
                  <!-- Close time -->
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <el-form-item label="Giờ đóng cửa" prop="timeClose">
                      <el-time-select
                        v-model="form.timeClose"
                        class="w-full"
                        :picker-options="timeOptions"
                        placeholder="Select time"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- More infor -->
                <el-form-item label="Thời gian giữa các trận" prop="timeDistance">
                  <el-input v-model="form.timeDistance" class="w-100" maxlength="10" show-word-limit />
                </el-form-item>

                <div class="box-shadow-1 bordered-5 bg--white pd-1-em mb-1-em">
                  <p>Service</p>
                  <el-row v-for="(item, i) in form.services" :key="i" :gutter="12">
                    <el-col :xs="7" :sm="7" :md="7" :lg="7">
                      <el-form-item label="Thời gian">
                        <el-input v-model="form.services[i].timeStart" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="7" :sm="7" :md="7" :lg="7">
                      <el-form-item label="Giá tiền">
                        <el-input v-model="form.services[i].price" />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="8" :md="8" :lg="8">
                      <el-form-item label="Tên dịch vụ">
                        <el-input v-model="form.services[i].name" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <i
                        v-if="form.services.length > 1"
                        class="el-icon-close mt-[46px] text-[1.5rem] hover:text-[red] cursor-pointer"
                        @click="deleteService(i)"
                      />
                    </el-col>
                  </el-row>

                  <el-button type="primary" size="small" @click="form.services.push({})">Thêm mới</el-button>
                </div>

                <!-- Rent price -->
                <el-form-item label="Giá thuê" prop="priceMin">
                  <el-input v-model="form.priceMin" class="w-100" maxlength="12" show-word-limit />
                </el-form-item>

                <!-- Limit people -->
                <el-form-item label="Số người tối đa trên sân" prop="limitUsers">
                  <el-input v-model="form.limitUsers" class="w-100" maxlength="10" show-word-limit />
                </el-form-item>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :xl="8">
              <!-- Image  -->
              <div class="box-shadow-1 bordered-5 bg--white pd-1-em mb-1-em">
                <p class="mb-[1em]">Ảnh chi tiết</p>
                <div>
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
              </div>

              <!-- Time Gold  -->
              <div class="box-shadow-1 bordered-5 bg--white pd-1-em mb-1-em">
                <p>Giờ vàng</p>
                <el-row v-for="(item, i) in form.timeGold" :key="i" :gutter="12">
                  <el-col :xs="11" :sm="11" :md="11" :lg="11">
                    <el-form-item label="Thời gian">
                      <el-time-select
                        v-model="form.timeGold[i].timeStart"
                        class="w-full"
                        :picker-options="goldTimeOptions"
                        placeholder="Select time"
                      />
                      <!-- <el-input v-model="form.timeGold[i].timeStart" /> -->
                    </el-form-item>
                  </el-col>
                  <el-col :xs="10" :sm="10" :md="10" :lg="10">
                    <el-form-item label="Giá tiền">
                      <el-input v-model="form.timeGold[i].price" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <i
                      v-if="form.timeGold.length > 1"
                      class="el-icon-close mt-[46px] text-[1.5rem] hover:text-[red] cursor-pointer"
                      @click="deleteTimeGold(i)"
                    />
                  </el-col>
                </el-row>

                <el-button type="primary" size="small" @click="form.timeGold.push({})">Thêm mới</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="text-right mt-1-em">
          <el-button class="btn--orange btn" icon="el-icon-circle-close">Cancel</el-button>
          <el-button class="btn--green btn" icon="el-icon-circle-check" @click="createPlace">Save</el-button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { getPlaceType, createPlace } from '@/apis/place'
import { getAddress } from '@/apis/address'
export default {
  data() {
    return {
      loading: false,

      rules: {},
      type: {},
      cityCode: null,
      districtCode: null,
      cities: [],
      districts: [],

      fileList: [],
      timeOptions: {
        start: '08:30',
        step: '01:00',
        end: '21:30'
      },
      form: {
        name: '',
        address: '',
        timeOpen: '',
        description: '',
        timeClose: '',
        timeDistance: 90,

        imageDetails: [],
        limitUsers: 24,
        services: [{}],
        timeGold: [{}],
        typePlace: null
      }
    }
  },

  computed: {
    goldTimeOptions() {
      return {
        start: this.form.timeOpen,
        step: '00:30',
        end: this.form.timeClose
      }
    }
  },

  async created() {
    await Promise.all([this.getPlaceType(), this.getCities()])
  },

  methods: {
    async getCities() {
      const { data } = await getAddress()
      this.cities = data
    },

    async onCityChange() {
      try {
        if (!this.cityCode) {
          this.districtCode = null
          return false
        }

        const { data } = await getAddress({ cityCode: this.cityCode })
        this.districts = data
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra xin vui lòng thử  lại sau')
      }
    },
    async createPlace() {
      try {
        await this.$nextTick()
        const address = []
        if (this.$refs.city.selectedLabel) {
          address.push(this.$refs.city.selectedLabel)
        }

        if (this.$refs.district.selectedLabel) {
          address.push(this.$refs.district.selectedLabel)
        }

        address.push(this.form.address)

        const sendData = {
          ...this.form,
          typePlace: {
            id: this.form.typePlace
          },
          services: this.form.services.map((item) => {
            return {
              ...item,
              image: ''
            }
          }),
          address: address.join(', ')
        }

        await createPlace(sendData)
        this.$vmess.success('Thêm sân mới thành công')
        this.$router.push('/stadium')
      } catch (error) {
        console.log(error)
        this.$vmess.error('Đã có lỗi xảy ra! Vui lòng thử lại sau')
      }
    },

    handlePreview(file) {
      this.fileList.push(file.url)
    },

    deleteService(index) {
      this.form.services.splice(index, 1)
    },

    deleteTimeGold(index) {
      this.form.timeGold.splice(index, 1)
    },

    async getPlaceType() {
      const res = await getPlaceType()
      this.type = res.data.data
    },

    handleUploadSuccess(e) {
      this.form.imageDetails = [e.data]
    }
  }
}
</script>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
</style>
