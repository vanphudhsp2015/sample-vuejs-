<template>
 <a-table 
 :columns="columns" 
 :dataSource="data" 
  :rowKey="record => record.id"
 >
    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="removeItem(record.id)">Delete</a>
      <a href="javascript:;" class="ant-dropdown-link" @click="editItem(record.id)"> edit<a-icon type="down" /> </a>
    </span>
  </a-table>
</template>

<script>
const columns = [
    {
      title: 'Tên',
      dataIndex: 'ten',
      key: 'ten',
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];
export default {
  name: 'antd-table',
  data() {
      return {
        columns,
      };
    },
  props: {
    data:{
      type: Array,
      required: true
    }
  },
  components: {
  },
  methods: {
    removeItem(id){
      const self = this;
        this.$confirm({
          title: 'Notification?',
          content: 'U want delete item',
          onOk() {
            self.$emit('deleteItem', id);
          },
          onCancel() {},
        });
    },
    editItem(id) {
      this.$emit('editItem', id);
    }
  },
}
</script>

<style scoped>
</style>
