<template>
  <div>
    <h1 style="margin-bottom: 40px;">Menu</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.sku }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);

const readData = async () => {
  try {
    const response = await axios.get(window.global.api_location + '/products');
    products.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  readData();
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #130303;
}
</style>