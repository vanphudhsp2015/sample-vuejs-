<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="ten" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-input
        v-decorator="['ten', { rules: [{ required: true, message: 'Please input your note!' }] }]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>

export default {
  name: 'form-shared',
  data(){
   return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  components: {
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
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
        }
      });
    }
  },
  props: {
    dataEdit: {
      type: Object,
      required: true
    }
  },
  watch: {
    dataEdit(){
      if(this.dataEdit.isEdit){
        this.form.setFieldsValue({
          ten: this.dataEdit.ten
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
