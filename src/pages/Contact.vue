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
          v-decorator="['name', { rules: [{ required: true, message: 'Please input your note!' }] }]"
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
    <TableAnt :data="data" @deleteItem="removeItem($event)" />
  </div>
</template>

<script>
import TableAnt from '../components/shared/TableAnt';

export default {
  name: 'contact',
  data(){
    return {
      data: [
        { id: 1, name: 'person', age: 60},
        { id: 2, name: 'person1', age: 60},
        { id: 3, name: 'person1', age: 60},
      ],
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'contact' }),
      loading: false
    }
  },
  components: {
    TableAnt
  },
  methods: {
    removeItem(id){
      this.data = this.data.filter(item => item.id !== id)
    },
    handleOk(){
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
           setTimeout(() => {
            this.data = [...this.data, {id: this.data[this.data.length -1].id +1, name: values.name}];
            this.visible = false
            this.loading = false;
            this.form.resetFields();
          }, 1000);
        }
      });
    },
    showModal(){
      this.visible = true
    },
    handleCancel(){
      this.visible = false,
      this.form.resetFields();
    }
  },
}
</script>

<style scoped>
</style>
