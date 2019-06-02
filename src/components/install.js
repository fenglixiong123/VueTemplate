// 组件全局注册
import Vue from 'vue'

import AppNote from './AppNote'
import AppTitle from './AppTitle'
import AppToolbar from './AppToolbar'
import AppSection from './AppSection'
import AppSearch from './AppSearch'

const myComponents = [
  AppNote,
  AppTitle,
  AppToolbar,
  AppSection,
  AppSearch,
];

myComponents.map(component=>{
  Vue.component(component.name,component);
});

