<template lang="html">
  <div>
    <v-header
      :has-button="true"
      title-icon="user"
      :button-text="$t('button.add')"
      title-text="Quản lý chủ sân"
      @buttonClick="$router.push({ name: 'UserAdd' })"
    />

    <main class="content-main-container">ChienTT</main>
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
