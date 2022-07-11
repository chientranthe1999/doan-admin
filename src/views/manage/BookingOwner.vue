<template lang="html">
  <div>
    <v-header :has-button="false" title-icon="booking" :button-text="$t('button.add')" title-text="Quản lý đơn hàng của các sân" />

    <main class="content-main-container">
      <div class="box-shadow bg-white rounded-lg p-[1em]">
        <el-row :gutter="24" class="mt-[2em]">
          <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
            <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
              <v-icon icon-class="cart" class="text-[80px] mr-[8px]" />
              <div class="overflow-hidden flex-1 text-center">
                <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">Tổng số đơn hàng</p>
                <p class="text-center text-[#00b5ad] text-[24px]">
                  {{ totalOrders }}
                </p>
              </div>
            </div>
          </el-col>

          <el-col :xs="12" :sm="12" :md="8" class="mb-[1em]">
            <div class="flex box-shadow-1 rounded-md w-fit px-[16px] py-[0.5rem] w-full">
              <v-icon icon-class="debt" class="text-[80px] mr-[8px]" />
              <div class="overflow-hidden flex-1 text-center">
                <p class="text-lg font-bold text-[#3a3a3a] mb-[0.5em] overflow-hidden overflow-ellipsis whitespace-nowrap">Doanh thu</p>
                <p class="text-center text-[#00b5ad] text-[24px]">
                  {{ money }}
                </p>
              </div>
            </div>
          </el-col>
        </el-row>

        <h2 class="my-[1em] text-lg font-500">Thông tin chi tiết</h2>

        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
          <template slot="status">
            <div class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">Đã thanh toán</div>
          </template>
          <template slot="action">
            <div class="text-center">
              <el-button type="primary" icon="el-icon-check"> Pay </el-button>
            </div>
          </template>
        </v-table>
      </div>
    </main>
  </div>
</template>
<script>
import { addMinutes, subMinutes } from 'date-fns';
import { getOrderOwner } from '../../apis/order';
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      gas: 10,
      totalOrders: 0,
      money: 0,
      results: [
        {
          station: 'Sân Nam Từ Liêm',
          name: 'Thằng DP',
          phone: '12345678',
          time: '13:30 23/12/2021',
          created_at: '23/12/2021',
        },
      ],

      cols: [
        {
          prop: 'station',
          label: 'Sân',
          minWidth: '20',
        },
        // {
        //   prop: 'name',
        //   label: 'Người đặt vé',
        //   minWidth: '15'
        // },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15',
        },
        {
          prop: 'time',
          label: 'Thời gian sử dụng',
          minWidth: '15',
        },
        {
          prop: 'money',
          label: 'Số tiền',
          minWidth: '10',
        },

        {
          prop: 'created_at',
          label: 'Ngày đặt',
          minWidth: '10',
        },
      ],
    };
  },
  async created() {
    const data = await (await getOrderOwner()).data;
    let money = 0;
    this.results = data.map((res) => {
      const timeEnd = addMinutes(new Date(2020, 1, 1, Number(res.timeBlocks[0].timeStart.slice(0, 2)), Number(res.timeBlocks[0].timeStart.slice(-2))), res.place.timeDistance)
        .toString()
        .slice(16, 21);
      money = Number(money) + Number(res.money);
      return {
        station: `${res.place.name}-${res.place.address}`,
        name: '',
        phone: res.phoneNumber,
        money: res.money + 'VND',
        time: res.timeBlocks[0].timeStart + ' Đến ' + timeEnd + ' Ngày ' + res.dayOrder,
        created_at: res.createAt,
      };
    });
    this.money = money;
    this.totalOrders = this.results.length;
  },
};
</script>
<style lang=""></style>
