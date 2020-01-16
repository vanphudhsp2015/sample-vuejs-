<template>
  <div>
    <a-button @click="showModal">Add</a-button>
    <a-modal 
      title="Basic Modal" 
      v-model="visible" 
      @ok="handleOk"
      @cancel="handleCancel"
      centered
    >
    <a-form :form="form">
      <a-form-item label="Name" >
        <a-input
          placeholder="input placeholder"
          v-decorator="['name', {            
            initialValue: name,
            rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
    </a-form>
     <template slot="footer">
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
    </a-modal>
    <TableAnt :data="data" :loadingTable="loadingTable" @deleteItem="removeItem($event)" @editItem="editItem($event)" />
  </div>
</template>

<script>
import TableAnt from '../components/shared/TableAnt';
import axios from 'axios'

export default {
  name: 'contact',
  data(){
    return {
      data: [],
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'contact' }),
      loading: false,
      name: '',
      isEdit: false,
      id: 0,
      loadingTable: false
    }
  },
  components: {
    TableAnt
  },
  methods: {
    removeItem(id){
       axios.request({
          url: `https://5caacc7969c15c00148494dc.mockapi.io/product/${id}`,
          method: 'DELETE',
      }).then(response=>{
        if(response){
          this.data = this.data.filter(item => item.id !== id)
        }
      }).catch(error=>{
          // eslint-disable-next-line no-console
          console.log(error)
      })
    },
    handleOk(){
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
             if(this.isEdit){
                axios.request({
                 url: `https://5caacc7969c15c00148494dc.mockapi.io/product/${this.id}`,
                 method: 'PUT',
                 data: {
                   name: values.name
                 }
               }).then(response=>{
                  this.data = this.data.map(item=> item.id === this.id ? response.data : item)
                  this.loading = false;
                  this.visible = false
                  this.form.resetFields();
               }).catch(error=>{
                  // eslint-disable-next-line no-console
                  console.log(error)
               })
               this.isEdit = false
             } else {
               axios.request({
                 url: 'https://5caacc7969c15c00148494dc.mockapi.io/product',
                 method: 'POST',
                 data: {
                   name: values.name
                 }
               }).then(response=>{
                  this.data = [...this.data, response.data];
                  this.loading = false;
                  this.visible = false
                  this.form.resetFields();
               }).catch(error=>{
                  // eslint-disable-next-line no-console
                  console.log(error)
               })
             }
        }
      });
    },
    showModal(){
      this.visible = true;
    },
    handleCancel(){
      this.visible = false,
      this.form.resetFields();
    },
    editItem(id){
      this.visible = true;
      this.name = this.data.find(item=> item.id === id).name
      this.id = this.data.find(item=> item.id === id).id
      this.isEdit = true
    },
    onLoadData(){
      this.loadingTable = true;
      axios
      .get('https://5caacc7969c15c00148494dc.mockapi.io/product')
      .then(response => {
        this.loadingTable = false;
        this.data = response.data
      })
    }
  },
  beforeMount(){
  },
  mounted () {
    this.onLoadData();
  }
}
</script>

<style scoped>
</style>
