<template lang="html">
  <div>
    <v-header title-text="Tạo ngày nghỉ" />
    <div class="content-main-container">
      <div class="bg-[white] rounded-md p-[0.5em] box-shadow-1">
        <el-form ref="form" :model="form" :rules="rules">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-form-item label="Chọn sân" prop="place_id">
                <el-select v-model="form.place_id" class="w-full" placeholder="Chọn sân">
                  <el-option v-for="item in places" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
              <el-form-item label="Chọn ngày" prop="dayOff">
                <el-date-picker
                  v-model="form.dayOff"
                  type="date"
                  placeholder="Pick a day"
                  class="mb-[1em] w-100"
                  format="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Lí do nghỉ" prop="reason">
            <el-input v-model="form.reason" class="w-100" placeholder="Lí do nghỉ" type="textarea" :rows="4" />
          </el-form-item>
        </el-form>

        <div class="text-right mt-1-em">
          <el-button class="btn--orange btn" icon="el-icon-circle-close">Cancel</el-button>
          <el-button class="btn--green btn" icon="el-icon-circle-check" @click="createDayOff">Save</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlaceOwner, createDayOff } from '@/apis/place'

export default {
  data() {
    return {
      form: {
        dayOff: null,
        reason: null,
        place_id: null
      },
      places: [],
      rules: {
        dayOff: [
          {
            required: true,
            message: 'Vui lòng chọn ngày nghỉ',
            trigger: 'blur'
          }
        ],
        reason: [
          {
            required: true,
            message: 'Vui lòng nhập lí do nghỉ',
            trigger: 'blur'
          }
        ],
        place_id: [
          {
            required: true,
            message: 'Vui lòng chọn sân',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  async created() {
    await this.getPlace()
  },
  methods: {
    async getPlace() {
      try {
        const res = await getPlaceOwner({
          page: 1,
          pageSize: 100
        })
        this.places = res.data.data.records
      } catch (error) {
        console.log(error)
      }
    },

    async createDayOff() {
      try {
        await this.$refs.form.validate()
        await createDayOff({
          ...this.form,
          place: {
            id: this.form.place_id
          }
        })
        this.$vmess.success('Tạo mới ngày nghỉ thành công')
        this.$router.push('/stadium')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang=""></style>
