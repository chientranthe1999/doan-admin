<template lang="html">
  <div>
    <v-header :has-button="false" title-icon="booking" :button-text="$t('button.add')" title-text="Quản lý nạp thẻ" />

    <main class="content-main-container">
      <div class="box-shadow bg-white rounded-lg p-[1em]">
        <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem]">
          <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
          <div>
            <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em]">Tổng số nạp thẻ</p>
            <p class="text-center text-[#00b5ad] text-[30px]">{{ totalCharge }}</p>
          </div>
        </div>
        <h2 class="my-[1em] text-lg font-500">Khoảng thời gian</h2>
        <el-date-picker
          v-model="dateSearch"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :size="size"
        />
        <el-button class="btn--green btn ml-[1em]" icon="el-icon-circle-check" @click="onSearch">Tìm kiếm</el-button>
        <h2 class="my-[1em] text-lg font-500">Thông tin chi tiết</h2>

        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
          <template slot="status">
            <div class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">
              Đã thanh toán
            </div>
          </template>
          <template slot="action">
            <div class="text-center">
              <el-button type="primary" icon="el-icon-check">Pay</el-button>
            </div>
          </template>
        </v-table>
      </div>
    </main>
  </div>
</template>
<script>
import { getCharge } from '../../apis/charge'
import moment from 'moment'
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      totalCharge: 0,
      total: 1,
      page: 1,
      limit: 20,
      gas: 10,
      dateSearch: '',
      results: [
        {
          fullname: 'Sân Nam Từ Liêm',
          email: 'Thằng DP',
          phone: '12345678',
          money: '13:30 23/12/2021',
          balance: '23/12/2021'
        }
      ],

      cols: [
        {
          prop: 'fullname',
          label: 'Khách hàng',
          minWidth: '20'
        },
        {
          prop: 'email',
          label: 'Email',
          minWidth: '15'
        },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15'
        },
        {
          prop: 'money',
          label: 'Số tiền nạp',
          minWidth: '15'
        },
        {
          prop: 'balance',
          label: 'Số dư tại thời điểm nạp',
          minWidth: '10'
        },

        {
          prop: 'created_at',
          label: 'Ngày nạp',
          minWidth: '10'
        }
      ]
    }
  },

  async created() {
    const listCharge = await getCharge({
      dateStart: '1999/03/10',
      dateEnd: '2500/09/10',
      page: 1,
      pageSize: 10
    })
    this.results = listCharge.data.records.map((e) => {
      return {
        fullname: e?.fullName ? e.fullName : '',
        email: e.email || '',
        phone: e.phone || '',
        money: e.money || '',
        balance: e.user.money,
        created_at: moment(new Date(e.createdAt)).format('YYYY/MM/DD HH:mm:ss')
      }
    })

    this.totalCharge = listCharge.data.total
  },
  methods: {
    async onSearch() {
      const listCharge = await getCharge({
        dateStart: moment(new Date(this.dateSearch[0])).format('YYYY/MM/DD'),
        dateEnd: moment(new Date(this.dateSearch[1])).format('YYYY/MM/DD'),
        page: 1,
        pageSize: 10
      })
      this.results = listCharge.data.records.map((e) => {
        return {
          fullname: e?.fullName ? e.fullName : '',
          email: e.email || '',
          phone: e.phone || '',
          money: e.money || '',
          balance: e.user.money,
          created_at: moment(new Date(e.createdAt)).format(
            'YYYY/MM/DD HH:mm:ss'
          )
        }
      })

      this.totalCharge = listCharge.data.total
    }
  }
}
</script>
<style lang=""></style>
