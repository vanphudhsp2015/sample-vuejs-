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
    <TableAnt :data="all" :loadingTable="loadingdata" @deleteItem="removeItem($event)" @editItem="editItem($event)" />
  </div>
</template>

<script>
import TableAnt from '../components/shared/TableAnt';
import { mapGetters } from 'vuex'

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
      this.$store.dispatch({
        type: 'destroy',
        id
      });
    },
    handleOk(){
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
             if(this.isEdit){
              this.$store.dispatch({
                  type: 'updateBlog',
                  data: {
                    id: this.id,
                    ...values
                  }
                }).then((response)=>{
                  if(response){
                    this.loading = false;
                    this.visible = false
                    this.form.resetFields();
                  }
                });
             } else {
                this.$store.dispatch({
                  type: 'saveBlog',
                  data: values
                }).then(()=>{
                  this.loading = false;
                  this.visible = false
                  this.form.resetFields();
                });
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
      this.name = this.all.find(item=> item.id === id).name
      this.id = this.all.find(item=> item.id === id).id
      this.isEdit = true
    },
    onLoadData(){
      this.$store.dispatch('getAllBlogs');
    },
  },
  computed: mapGetters({
    all: 'all',
    message: 'message',
    loadingdata: 'loadingdata'
  }),
  beforeMount(){
  },
  created(){
    // this.onLoadData();
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.log(this.$router.history  )
    this.onLoadData();
  },
}
</script>

<style scoped>
</style>
