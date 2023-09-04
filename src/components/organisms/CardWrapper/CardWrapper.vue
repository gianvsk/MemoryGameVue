<script setup lang="ts">
import Card, { CardType } from '../../molecules/Card/Card.vue';
import { ref, reactive, computed } from 'vue'

const { cards } = defineProps<{
    cards: CardType[]
}>()

const emitter = defineEmits<{
    sendValueToApp: [value: number]
}>()

const sendValueToApp = (value: number) => {
    emitter('sendValueToApp', value)
}

</script>

<template>
    <ul class='board-custom flex flex-wrap justify-between items-center w-660 min-h-680 p-8 mb-12 rounded-10'>
        <li v-for="card in cards">
            <Card :card-id='card.cardId' :card-icon="card.cardIcon" :turn-card="card.turnCard" :verified="card.verified"
                @send-value="sendValueToApp" />
        </li>
    </ul>
</template>

<style scoped>
.board-custom {
    background: linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%);
    box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.5);
}
</style>