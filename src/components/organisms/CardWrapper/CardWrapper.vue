<script setup>
import CardDeck from '../../molecules/CardDeck/CardDeck.vue';

const cards = [...Array(16).keys()]

const assignIcon = () => {}

</script>

<template>
    <div class='board-custom flex flex-wrap justify-between items-center w-660 min-h-680 p-8 mb-12 rounded-10'>
        <ul v-for="(card,index) in cards">
            <li>
                <CardDeck :key="index" :card-id='index' :card-check="true" :right-card="false"/>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.board-custom {
    background: linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%);
    box-shadow: 12px 15px 20px 0 rgba(46, 61, 73, 0.5);
}
</style>