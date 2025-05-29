<template>
  <div>
    <h2>Product</h2>
    <ul>
      <li v-for="p in products" @click="addToCart(p)" >{{p.product}}, inr: {{p.price}}</li>
    </ul>
    <hr>
    <h2>Cart (discount: {{discountApplicable? 'yes': 'no'}}) </h2>
    <table border="1">
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
      <tr v-for="p in cart">
        <td>{{p.product}}</td>
        <td>{{p.price}}</td>
        <td @click="removeFromCart(p)">{{p.quantity}}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const products = [
  {
    product: "t-shirt",
    price: 100,
  },
  {
    product: "coffee-mug",
    price: 200,
  },
  {
    product: "aeroplane",
    price: 150,
  },
  {
    product: "car",
    price: 120,
  },
]

const cart = ref([])
const discountApplicable = ref(false)

watch(cart, (newVal) => {
  // const itemIndex = cart.value.findIndex((x) => x.quantity >= 5)
  if (cart.value.length > 0 && cart.value.reduce((acc, x) => acc + x.quantity, 0) > 10) {
    discountApplicable.value = true;
  } else {
    discountApplicable.value = false;
  }
}, { deep: true })

function addToCart(item) {
  const itemIndex = cart.value.findIndex((x) => x.product === item.product)
  if (itemIndex !== -1) {
    cart.value[itemIndex].quantity++
  } else {
    cart.value.push({
      ...item,
      quantity: 1,
    })
  }
}

function removeFromCart(item) {
  const itemIndex = cart.value.findIndex((x) => x.product === item.product)
  if (itemIndex !== -1) {
    if (cart.value[itemIndex].quantity === 1) {
      cart.value.splice(itemIndex, 1)
      return
    }
    cart.value[itemIndex].quantity--
  }
}
</script>
