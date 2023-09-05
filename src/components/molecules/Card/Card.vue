<script setup lang="ts">
import Icon from '../../atoms/Icon/Icon.vue';
import { inject, watch, ref } from 'vue';

export type CardType = {
    cardIcon: string,
    cardId: number,
    turnCard: boolean
    verified: boolean
}

const { cardIcon, cardId, turnCard, verified } = defineProps<CardType>()

const buttonNotClickable = inject<boolean>('isClickable')

const emitter = defineEmits<{
    sendValue: [value: number]
}>()

const sendCardValue = () => {
    emitter('sendValue', cardId)
}

</script>

<template>
    <button :class="['relative flex justify-center items-center w-full h-full bg-light-blue rounded-lg shadow-card hover:cursor-pointer',
        !turnCard && !verified ? 'before:absolute before:inset-0 before:bg-dark-grey before:z-10 before:rounded-lg' : '',
        turnCard && verified ? 'animate-smallFlip sm:animate-flip bg-light-green' : '']" :disabled="buttonNotClickable" @click="sendCardValue">
        <Icon :icon="cardIcon" />
    </button>
</template>

<style scoped></style>