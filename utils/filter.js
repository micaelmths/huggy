import Vue from 'vue';

Vue.filter('averagePercent', function (value) {
  let parcent = value.toFixed(1) * 10
  return parcent
});
Vue.filter('monetary', function (value) {
  return value.toLocaleString('en-us',{style: 'currency', currency: 'USD'});
});