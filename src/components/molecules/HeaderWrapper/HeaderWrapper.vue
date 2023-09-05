<script setup lang="ts">
import Icon from '../../atoms/Icon/Icon.vue';

type HeaderWrapperProps = {
    stars: boolean[],
    time: string,
    moves: number
}

const { stars, time, moves } = defineProps<HeaderWrapperProps>()

const emitter = defineEmits<{
    sendReset: []
}>()

const setReset = () => {
    emitter('sendReset')
}

</script>

<template>
    <div class='header flex flex-col justify-center items-center mb-10'>
        <h1 class='text-32 my-21.440 text-black'>Matching Game</h1>
        <div class='flex w-full xs:w-345 justify-between items-center'>
            <div class='flex gap-0.5'>
                <ul class='flex' v-for="star in stars">
                    <li>
                        <Icon :icon="star ? '/images/star.png' : '/images/star-full.png'" :sizeSmall="true" />
                    </li>
                </ul>
            </div>
            <h5 class='text-black'>{{ time }}</h5>
            <h5 class='text-black'>{{ moves.toString() + ' Moves' }}</h5>
            <Icon icon="/images/repeat.png" :sizeSmall="true" @click="setReset" />
        </div>
    </div>
</template>

<style scoped>
.header {
    background-color: transparent;
}
</style>