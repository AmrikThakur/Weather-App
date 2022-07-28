<template >
  <div id="app">
    <h1>Weather forCast</h1>
    <select @change="onChangeHandler($event)" class="form-select form-control">
        <option>Select City</option>
        <option v-for="item in cities" v-bind:key="item.id" :value="item.id" >
        {{item&& item.name}}
        </option>
    </select>
  </div>
  <div> 
    <h1 v-for="item in posts" :key="item.id">{{item&& item.description}}</h1>
        <h2 v-for="item in posts" :key="item.id">{{temp+'°F'}}</h2>

  </div>
    <br/>
    <button :disabled="test == false" @click="onClickHandler()">{{!toggle? 'See Forcast' :'Close'}}</button>
    <table v-if="toggle">
  <tr >
    <th>Date</th>
    <th>Humidity</th>
    <th>Min Temp</th>
    <th>Max Temp</th>
    <th>Wind Speed</th>
  </tr>
  <tr  v-for="item in listData"  :key="item.id">
    <td>{{item && item.dt_txt}}</td>
    <td>{{item && item.main && item.main.humidity || '-'}}</td>
    <td>{{item && item.main && item.main.temp_min || '-'}}</td>
    <td>{{item && item.main && item.main.temp_max || '-'}}</td>
    <td>{{item && item.wind && item.wind.speed || '-'}}</td>

  </tr>
</table>
</template>
<script>
// import Vue from 'vue'
import axios from 'axios'

// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)

export default{
data() {
  return {
     posts:'',
     temp:'',
     test:false,
     selectedId:'',
     toggle:false,
     listData:'',
       cities:[
       {"id": 6167865,name: "Toronto","country": "CA"},
       {"id": 6094817,name: "Ottawa","country": "CA"},
       {"id": 1850147,name: "Tokyo","country": "JP"}
        ],
          leaveType: '',
        }
    },

    methods: {
       async onChangeHandler(event) {
        this.test=true
            let findData= await event.target.value
           this.selectedId=findData
              const reqData = { city_id: findData};
          let res= await axios.post("http://localhost:3006/api/weather/currentWeather", reqData)
          const {data}=res
          const {values}=data
          this.temp=values && values.main &&values.main.temp-32*.5556
          const {weather}=values
          console.log(weather,'i am weather')
           this.posts = weather;
        },
        
       async onClickHandler(){
        this.toggle=!this.toggle
              const data = { city_id: this.selectedId};
          let res= await axios.post("http://localhost:3006/api/weather/forCastWeather", data)
          res=res.data
          const {values}=res
          console.log(res,'i am list')
          const {list}=values
          this.listData=list

        }
    }
}

</script>
<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 50%;
  margin-left: 25%;
  margin-top: 5%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>