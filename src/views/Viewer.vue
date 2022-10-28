<template>
  <button @click="viewParams">click</button>
  <div class="canvas__container"></div>
</template>

<script>
export default {
  name: 'Viewer',
  props: ['file'],
  data() {
    return {};
  },
  async mounted() {
    console.log(window.history.state);
    if (!window.history.state.file) {
      this.$router.push('/');
      return;
    }
    let fileDetails = window.history.state.file;

    let link = document.createElement('a');
    link.href = fileDetails.webViewLink;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>

<style lang="stylus"></style>
