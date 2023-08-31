<script setup>
import { ref } from 'vue';

    const {cardIcon, cardId, cardCheck, rightCard} = defineProps({
        cardIcon: String,
        cardId: Number,
        cardCheck: Boolean,
        rightCard: Boolean

    })

    const check = ref(cardCheck)
    const right = ref(rightCard)
    const cardSelected = ref(false)

    const clickable = ref(false)

    const notCorrect = () => {
        check.value ? check.value = !check.value : check.value,
/*         right.value = !right.value, */
        clickable.value = true,
        setTimeout(coverCard, 1000)
    }

    const coverCard = () => {
/*         right.value = !right.value */
        check.value = false
        clickable.value = false
    }

/*     const checkClickable = () => {
        console.log('coverCard', right.value)
        clickable.value = false
    } */

</script>

<template>
    <button :class="['relative flex justify-center items-center w-125 h-125 bg-light-blue rounded-lg shadow-card hover:cursor-pointer', 
                 check ? 'before:absolute before:inset-0 before:bg-dark-grey before:z-10 before:rounded-lg' : '',
                 right ? 'animate-flip bg-light-green' : '']"
                 :disabled="clickable"
                 @click="notCorrect"
                 >
                 

    </button>
</template>

<style scoped>

</style>