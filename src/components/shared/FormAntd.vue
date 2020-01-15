<template>
  <div>
    <a-button type="primary" @click="showModal">Add events</a-button>
    <a-modal
        title="Title"
        :visible="visible"
        @cancel="handleCancel"
        :centered="true"
        :maskClosable="false"
        @ok="handleOk"
      >
    <div>
    <a-form :form="form">
      <a-form-item 
      label="ten" 
      plaplaceholder="input placeholder"
       :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['ten',
           {           
            initialValue: ten,
            rules: [{ required: true, message: 'Please input your ten!' }] 
            }
          ]"
        />
      </a-form-item>
    </a-form>
    </div>
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'form-antd',
  data(){
    return {
      visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      ten: ''
    }
  },
  components: {
  },
  props: {
   dataEdit: {
     type: Object,
     required: true
   } 
  },
  methods: {
    showModal(){
      this.visible  = true
    },
    handleCancel() {
      this.visible = false;
      this.resetData();
    },
    handleOk(){
      this.form.validateFields((err, values) => {
        if (!err) {
          if(this.dataEdit.isEdit){
            const data = {
              ...values,
              id: this.dataEdit.id
            };
            this.$emit('updateItem', data);
          }else{
            this.$emit('addItem', values);
          }
          this.form.resetFields();
          this.handleCancel();
        }
      });
    },
    resetData(){
      this.ten = ''
    }
  },
  watch: {
    dataEdit(){
      if(this.dataEdit.isEdit){
        this.visible = true;
        this.ten = this.dataEdit.ten
      }
    }
  }
}
</script>

<style scoped>
</style>
