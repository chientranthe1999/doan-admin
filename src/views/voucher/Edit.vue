<template lang="html">
  <div>
    <v-header title-text="Chỉnh sửa voucher" title-icon="voucher" />
    <div class="content-main-container">
      <main class="bg-white rounded-lg p-[1em] py-[2em] max-w-[1140px] mx-auto">
        <el-form label-position="top">
          <el-row>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Chọn địa điểm áp dụng voucher">
                <el-select
                  :value="selectPlace.name"
                  class="w-full"
                  filterable
                  placeholder="Chọn sân"
                  @change="onChangePlace"
                >
                  <el-option v-for="item in listPlace" :key="item.id" :label="item.name" :value="item" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Tên voucher">
                <el-input v-model="name" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Số lượng voucher">
                <el-input v-model="amount" class="w-full" />
              </el-form-item>
            </el-col>

            <el-col :sm="24" :md="24" :lg="24">
              <el-row :gutter="24">
                <el-col :sm="18" :xs="18" :md="18" :lg="18">
                  <el-form-item label="Giảm giá">
                    <el-input v-model="value" class="w-full" />
                  </el-form-item>
                </el-col>

                <el-col :sm="6" :xs="6" :md="6" :lg="6">
                  <el-form-item label="Đơn vị">
                    <el-select v-model="type" class="w-full">
                      <el-option value="%">%</el-option>
                      <el-option value="VNĐ">VNĐ</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-form-item label="Trạng thái">
              <el-radio-group v-model="isActive">
                <el-radio :label="1">Đang áp dụng</el-radio>
                <el-radio :label="0">Không áp dụng</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Ngày Hết Hạn">
              <el-date-picker v-model="endDate" type="dates" />
              {{ endDate }}
            </el-form-item>

            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Điều kiện áp dụng voucher đơn trị giá">
                <el-input v-model="moneyCondition" class="w-full" />
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="24" :lg="24">
              <el-form-item label="Giá giảm tối đa">
                <el-input v-model="maxMoneySale" class="w-full" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="text-right mt-1-em">
            <el-button class="btn--green btn" icon="el-icon-circle-check" @click="onSubmitCreateVoucher">
              Save
            </el-button>
            <el-button class="btn--red btn" @click="onClickDeleteVoucher">Xóa Voucher</el-button>
          </div>
        </el-form>
      </main>
    </div>
  </div>
</template>
<script>
import { getPlaceOwner } from '../../apis/place'
import { editVoucher, getDetailsVoucher, deleteVoucher } from '../../apis/voucher'
import * as moment from 'moment'
export default {
  name: 'VoucherList',
  data() {
    return {
      listVoucher: [],
      listPlace: [],
      selectPlace: {},
      amount: '',
      moneyCondition: '',
      maxMoneySale: '',
      type: '',
      value: '',
      endDate: '',
      name: '',
      isActive: 0
    }
  },
  async created() {
    const voucher = await getDetailsVoucher(this.$route.params.id)
    const { place, maxMoneySale, moneyCondition, name, value, type, endDate, amount, isActive } = voucher.data.data
    this.selectPlace = place
    this.maxMoneySale = maxMoneySale
    this.moneyCondition = moneyCondition
    this.name = name
    this.value = value
    this.type = type === 0 ? '%' : 'VND'
    this.amount = amount
    this.isActive = isActive
    // this.endDate = endDate
  },

  async mounted() {
    this.listPlace = await (await getPlaceOwner()).data.data.records
  },
  methods: {
    onChangePlace(place) {
      this.selectPlace = place
    },
    async onSubmitCreateVoucher() {
      const voucherBody = {
        maxMoneySale: this.maxMoneySale,
        moneyCondition: this.moneyCondition,
        name: this.name,
        value: this.value,
        type: this.type === '%' ? 0 : 1,
        amount: Number(this.amount),
        place: this.selectPlace,
        isActive: this.isActive,
        endDate: moment(new Date(this.endDate)).format('YYYY/MM/DD')
      }
      await editVoucher(this.$route.params.id, voucherBody)
      this.$vmess.success('Edit thành công')
      this.$router.push('/voucher')
    },

    async onClickDeleteVoucher() {
      await deleteVoucher(this.$route.params.id)
      this.$vmess.success('Xóa voucher thành công')
      this.$router.push('/voucher')
    }
  }
}
</script>
<style lang="scss"></style>
