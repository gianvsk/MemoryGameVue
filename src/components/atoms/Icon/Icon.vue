<script setup lang="ts">

type IconProps = {
    icon: string,
    sizeSmall?: boolean
}

const {icon, sizeSmall = false} = defineProps<IconProps>()

</script>

<template>
    <img :src="icon" :class="[!sizeSmall ? 'w-8 h-8' : 'w-4 h-4']"/>
</template>