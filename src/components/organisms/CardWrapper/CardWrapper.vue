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
    <ul class='board-custom grid grid-cols-4 grid-rows-4 m-auto gap-4 p-2 rounded-10 h-96 xs:p-6 xs:gap-6 sm:min-h-680 sm:w-full sm:gap-6 xs:h-480 sm:p-8 sm:mb-12' >
        <li v-for="card in cards" class="sm:w-auto sm:auto md:w-125 md:h-125">
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