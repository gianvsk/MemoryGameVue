<script setup lang="ts">
import { CardType } from './components/molecules/Card/Card.vue';
import HeaderWrapper from './components/molecules/HeaderWrapper/HeaderWrapper.vue';
import CardWrapper from './components/organisms/CardWrapper/CardWrapper.vue';
import { ref, createApp, provide } from 'vue';

const app = createApp({})

const starsArray = ref(3)

const icons = ['/images/anchor.png',
  '/images/bicycle.png',
  '/images/bomb.png',
  '/images/cube.png',
  '/images/diamond.png',
  '/images/flash.png',
  '/images/leaf.png',
  '/images/fly.png']

const cardIds = ref([...Array(16).keys()])

const cards = ref<CardType[]>([])
const idToCheck = ref<number[]>([])
const moves = ref<number>(0)
const buttonNotClickable = ref<boolean>(false)
const stars = ref<boolean[]>([false, false, false])
const countStars = ref<number>(0)

provide('isClickable', buttonNotClickable)

const createCards = () => {
  icons.map(el => makeCardsSameIcon(el))
  cards.value.sort((a: CardType, b: CardType) => a.cardId - b.cardId)  // sort the array by cardId
}

const makeCardsSameIcon = (el) => {  // creates 2 cards with same icon
  const idRandom1: number = Math.floor(Math.random() * cardIds.value.length)
  const card1 = { cardIcon: el, cardId: cardIds.value[idRandom1], turnCard: false, verified: false } as CardType
  cards.value.push(card1)
  cardIds.value.splice(idRandom1, 1)

  const idRandom2 = Math.floor(Math.random() * cardIds.value.length)
  const card2 = { cardIcon: el, cardId: cardIds.value[idRandom2], turnCard: false, verified: false } as CardType
  cards.value.push(card2)
  cardIds.value.splice(idRandom2, 1)
}

const coverCardsNotCompatible = (id1: number, id2: number) => {
  buttonNotClickable.value = true
  stars.value = [false, false, false]
  countStars.value = 0
  setTimeout(() => {
    cards.value[id1] = { ...cards.value[id1], turnCard: false }
    cards.value[id2] = { ...cards.value[id2], turnCard: false }
    buttonNotClickable.value = false
  }, 1000)
}

const verifyCard = (id: number) => {
  cards.value[id] = {...cards.value[id], verified: true}
}

const compareCardValues = (id: number) => {
  idToCheck.value.push(id)

  if (idToCheck.value.length === 2) {
    const card1Id = idToCheck.value[0]
    const card2Id = idToCheck.value[1]
    console.log('card1', card1Id, ' - card2 ', card2Id)
    if (cards.value[card1Id].cardIcon === cards.value[card2Id].cardIcon) {
      buttonNotClickable.value = true

      verifyCard(card1Id)
      verifyCard(card2Id)

      stars.value[countStars.value] = true
      countStars.value++
      moves.value++
      setTimeout(() => {
        buttonNotClickable.value = false
      }, 1000)
    }
    else {
      coverCardsNotCompatible(card1Id, card2Id)
      moves.value++
    }
    idToCheck.value = []
  }
}

const checkCardValues = (id: number) => {
  //questo è il giusto metedono di cambiare gli elementi di un array di oggetti.
  // cards.value.map(el => el.turn = true) è errato
  cards.value = cards.value.map(el => { return el.cardId === id ? { ...el, turnCard: true } : el })
  compareCardValues(id)

}

createCards()

</script>

<template>
  <div class="container-custom w-screen h-full flex flex-col items-center">
    <HeaderWrapper :stars="stars" :moves="moves"/>
    <CardWrapper :cards="cards" @send-value-to-app="checkCardValues" />
    <button @click="makeCardsSameIcon" />
  </div>
</template>

<style scoped>
.container-custom {
  background-image: url('/images/Geometry.png');
}
</style>
