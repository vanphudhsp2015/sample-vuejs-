<template>
  <div id="app">
  <a-layout id="components-layout-demo-top-side-2" class="layout-custome">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">  
          <router-link :to="'/'" class="btn btn-default">
            Home
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link :to="'/about'" class="btn btn-default">
            About
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link :to="'/contact'" class="btn btn-default">
            Contact
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" />subnav 1</span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop" />subnav 2</span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title"><a-icon type="notification" />subnav 3</span>
            <a-menu-item key="9">option9</a-menu-item>
            <a-menu-item key="10">option10</a-menu-item>
            <a-menu-item key="11">option11</a-menu-item>
            <a-menu-item key="12">option12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
        <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
  </div>
</template>
<script>

export default {
  name: 'app',
  components: {
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
      dataEdit: {},
      collapsed: false,
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
  color: #2c3e50;
  height: 100%;
}
.content {
  height: 100%;
}
.layout-custome {
  height: 100%;
}
</style>
