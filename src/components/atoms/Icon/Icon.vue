<script setup>

const {icon} = defineProps({
    icon: String
})

</script>

<template>
    <img :src="icon" class="w-4 h-4"/>
</template>