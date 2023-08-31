<script setup>
import Icon from '../../atoms/Icon/Icon.vue';


const { stars, time, moves } = defineProps({
    stars: Number,
    time: String,
    moves: Number
})

const actualStars = [...Array(stars).keys()]

const actualTime = '00:00'

const actualMoves = 0

console.log(actualStars)

</script>

<template>
    <div class='header flex flex-col justify-center items-center mb-10'>
        <h1 class='text-32 my-21.440 text-black'>Matching Game</h1>
        <div class='flex w-345 justify-between items-center'>
            <div class='flex gap-0.5'>
                <ul class='flex' v-for="star in actualStars">
                    <li>
                        <Icon icon="/images/star-empty.png" />
                    </li>
                </ul>
            </div>
            <h5 class='text-black'>{{ actualTime }}</h5>
            <h5 class='text-black'>{{ actualMoves.toString() + ' Moves' }}</h5>
            <Icon icon="/images/repeat.png" />
        </div>
    </div>
</template>

<style scoped>
.header {
    background-color: transparent;
}
</style>