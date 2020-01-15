<template>
  <div id="app">
  <Header />
  <div class="content">
    <FormAntd 
      v-bind:dataEdit="dataEdit" 
      v-on:addItem="addItem($event)" 
      v-on:updateItem="updateItem($event)" 
    />
    <TableAnt 
      :data="data" 
      @deleteItem="deleteItem"
      @editItem="editItem"
    />
  </div>
  <Footer />
  </div>
</template>
<script>
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import TableAnt from './components/shared/TableAnt';
import FormAntd from './components/shared/FormAntd';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
    TableAnt,
    FormAntd
  },
  data(){
    return {
      data: [
        {
          "id": 1,
          "ten": "Sở Tài Chínhd",
          "chaId": null
        },
        {
          "id": 2,
          "ten": "Sở Tài Chính 121",
          "chaId": null
        },
      ],
      dataEdit: {}
    }
  },
  methods: {
    deleteItem(event){
      return this.data = this.data.filter(item=> item.id !== event);
    },
    addItem(event){
      return this.data = [...this.data, {id: this.data[this.data.length-1].id+1, ten:event.ten}];
    },
    updateItem(event){
      this.data = this.data.map(item=> item.id === event.id ? event : item)
      this.dataEdit = {}
    },
    editItem(event){
      this.dataEdit = {
        ...this.data.find(item=> item.id ===event),
        isEdit: true
      }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.content {
  height: 100%;
}
</style>
