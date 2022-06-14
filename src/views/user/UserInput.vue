<template lang="">
  <el-drawer
    ref="drawer"
    :title="title"
    :before-close="handleClose"
    :visible.sync="dialog"
    direction="rtl"
    custom-class="device-drawer"
  >
    <div class="device-drawer__content">
      <el-form ref="form" :model="formData" label-width="100px" label-position="left" class="w-full" :rules="rules">
        <el-form-item v-for="(col, index) in cols" :key="index" :label="$t(`label.${col}`)" :prop="col">
          <el-input v-model="formData[col]" />
        </el-form-item>

        <!-- <el-form-item :label="$t('label.name')" prop="name">
          <el-input v-model="formData.full_name" />
        </el-form-item>

        <el-form-item :label="$t('label.phone')" prop="phone">
          <el-input v-model="formData.phone" />
        </el-form-item>

        <el-form-item :label="$t('label.role')" prop="role">
          <el-input v-model="formData.role" />
        </el-form-item> -->

        <!-- <el-form-item :label="$t('label.status')" prop="status">
          <el-input v-model="formData.status" />
        </el-form-item> -->
      </el-form>
    </div>
    <div class="device-drawer__footer">
      <el-button class="w-[50%]" @click="cancelForm">Cancel</el-button>
      <el-button class="w-[50%]" type="primary" :loading="loading" @click="$refs.drawer.closeDrawer()">
        {{ loading ? 'Submitting ...' : 'Submit' }}
      </el-button>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: 'DeviceInput',
  props: {
    title: {
      type: [Function, String],
      default: 'This is a drawer'
    },

    formType: {
      type: [Function, String],
      default: ''
    },

    initData: {
      type: Object,
      default: () => {}
    },

    isOpen: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      formData: {},
      loading: false,
      dialog: false,
      cols: ['email', 'name', 'phone', 'role'],
      rules: {
        email: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('router.email') }),
          trigger: 'blur'
        },
        name: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.name') }),
          trigger: 'blur'
        },
        phone: {
          required: true,
          message: this.$t('validation.required', { attribute: this.$t('label.phone') }),
          trigger: 'blur'
        }
      }
    }
  },

  watch: {
    isOpen(val) {
      this.dialog = val
    },

    initData(val) {
      this.formData = { ...val }
    }
  },

  methods: {
    handleClose(done) {
      if (this.loading) {
        return
      }
      this.$confirm('Do you want to submit?')
        .then((_) => {
          this.loading = true
          this.loading = false
          this.$emit('update:isOpen', false)
          this.$refs.form.resetFields()
        })
        .catch((_) => {})
    },

    cancelForm() {
      this.loading = false
      this.dialog = false
      this.$emit('update:isOpen', false)
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss">
.device-drawer {
  display: flex;
  flex-direction: column;

  &__content {
    @apply px-[1em];
    display: flex;
    flex: 1;
  }

  &__footer {
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #ddd;
  }
}

.el-drawer__body {
  display: flex;
  flex-direction: column;
}
</style>
