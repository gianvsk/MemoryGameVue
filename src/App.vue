<script setup>
import HeaderWrapper from './components/molecules/HeaderWrapper/HeaderWrapper.vue';
import CardWrapper from './components/organisms/CardWrapper/CardWrapper.vue';
import { ref } from 'vue';

const starsArray = ref(3)

</script>

<template>
  <div class="container-custom w-screen h-full flex flex-col items-center">
    <HeaderWrapper :stars="starsArray"/>
    <CardWrapper>
      <Card></Card>
    </CardWrapper>
  </div>
</template>

<style scoped>

.container-custom {
  background-image: url('/images/Geometry.png');
}

</style>
