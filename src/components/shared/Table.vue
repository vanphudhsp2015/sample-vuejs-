<template>
  <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Handle</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <th scope="row">{{index + 1}}</th>
      <td>{{item.ten}}</td>
      <td><button class="btn btn-danger" v-on:click="removeItem(item.id)">remove</button></td>
      <td><button class="btn btn-success" v-on:click="editItem(item.id)">Edit</button></td>
    </tr>
  </tbody>
</table>
</template>

<script>

export default {
  name: 'table-shared',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
  },
  methods: {
    removeItem(id){
      this.$emit('deleteItem', id)
    },
    async editItem(id){
      this.$emit('editItem', id)
    }
  }
}
</script>

<style scoped>
</style>
