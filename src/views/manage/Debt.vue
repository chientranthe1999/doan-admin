<template lang="html">
  <div>
    <v-header :has-button="false" title-icon="debt" :button-text="$t('button.add')" title-text="Quản lý công nợ" @buttonClick="$router.push({ name: 'UserAdd' })" />
    <el-dialog :visible.sync="dialogFormVisible" title="Thanh toán tiền cho chủ sân">
      <div class="mb-2 text-lg">
        <span>Tên chủ sân: </span> <span class="text-[#19b59e]">{{ selectedUser.name }}</span>
      </div>
      <div class="text-lg">
        <span>Số tiền cần thanh toán: </span> <span class="text-[#19b59e]">{{ selectedUser.debt }}</span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="payDebt">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="content-main-container">
      <div class="bg-white box-shadow-1 p-[0.5em] rounded-md">
        <div class="p-[1em] rounded-sm mb-[1em] flex items-center">
          <p class="text-md uppercase">Tổng số tiền cần thanh toán với chủ sân</p>
          <p class="ml-[auto] text-lg font-bold text-[#e84c3d]">{{ money }}đ</p>
        </div>
        <v-table :table-data="results" :columns="cols" :limit="limit" :page="page" :total="total">
          <template slot="status">
            <div class="text-center bg-[#00b5ad] text-[white] rounded-lg py-[0.5rem] w-[85%] mx-auto">Đã thanh toán</div>
          </template>
          <template #action="{ row }">
            <div class="text-center" v-if="row.deb">
              <el-button type="primary" icon="el-icon-check" @click="confirmPay(row)">Pay</el-button>
            </div>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getOwnerPlaces } from '@/apis/owner-place';
import { payOwner } from '@/apis/dashboad';
export default {
  data() {
    return {
      loading: false,
      isOpen: false,
      total: 1,
      page: 1,
      limit: 20,
      gas: 10,
      dialogFormVisible: false,
      selectedUser: {},
      form: {
        amount: '',
      },
      money: 0,
      results: [
        {
          name: 'Thắng Dp',
          phone: '12345678',
          status: 'Active',
        },
      ],

      cols: [
        {
          prop: 'name',
          label: 'Tên chủ sân',
          minWidth: '20',
        },
        {
          prop: 'phone',
          label: 'Số điện thoại',
          minWidth: '15',
        },
        {
          prop: 'debt',
          label: 'Số tiền đang nợ',
          minWidth: '10',
        },
        {
          prop: 'symbol',
          label: 'Ngân hàng',
          minWidth: '10',
        },
        {
          prop: 'stk',
          label: 'Số tài khoản',
          minWidth: '10',
        },
        // {
        //   prop: 'status',
        //   label: 'Trạng thái',
        //   minWidth: '10'
        // },
        {
          prop: 'action',
          label: this.$t('label.action'),
          minWidth: '10',
        },
      ],
    };
  },
  async created() {
    await this.getUserList();
  },
  methods: {
    confirmPay(user) {
      this.dialogFormVisible = true;
      this.selectedUser = user;
    },

    async payDebt() {
      try {
        const res = await payOwner({
          id: this.selectedUser.id,
          amount: this.selectedUser.debt,
        });

        this.dialogFormVisible = false;
        this.selectedUser = {};
        await this.getUserList();
        this.$vmess.success('Thanh toán thành công');
      } catch (e) {
        this.$vmess.error('Đã có lỗi xảy ra. Vui lòng thử lại');
      }
    },

    async getUserList() {
      try {
        this.loading = true;
        const res = await getOwnerPlaces({
          page: this.page,
          pageSize: this.limit,
        });
        console.log(res);
        let money = 0;
        this.results = res.data.data.records.map((e) => {
          money = money + Number(e?.ownerPlace?.money || '');

          return {
            name: e.fullName,
            phone: e?.ownerPlace?.phone || '',
            debt: e?.ownerPlace?.money || '',
            symbol: e?.ownerPlace?.bankSymbol || '',
            stk: e?.ownerPlace?.stk || '',
            id: e?.ownerPlace?.id || '',
          };
        });
        this.money = money;
        this.total = res.data.data.total;
      } catch (e) {
        this.results = [];
        this.$vmess.error('Đã có lỗi xảy ra. Vui lòng thử lại');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang=""></style>
