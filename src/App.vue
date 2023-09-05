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
const stars = ref<boolean[]>([false, false, false])
const countStars = ref<number>(0)
const seconds = ref<number>(0)
const minutes = ref<number>(0)

const gameCompleted = ref<boolean>(false)
const buttonNotClickable = ref<boolean>(false)
provide('isClickable', buttonNotClickable)

const createInterval = () => {
  return setInterval(() => {
    if (!gameCompleted.value) {
      seconds.value < 59 ? seconds.value = seconds.value + 1 : (seconds.value = 0, minutes.value = minutes.value + 1),
        printTime
      } else clearInterval(interval.value)
    }, 1000)
}

const interval = ref(createInterval())

const startGame = () => {
  cardIds.value = [...Array(16).keys()]
  icons.map(el => makeCardsSameIcon(el))
  cards.value.sort((a: CardType, b: CardType) => a.cardId - b.cardId)  // sort the array by cardId
}

const restartGame = () => {
  clearInterval(interval.value)
  console.log('interval', interval.value)
  cards.value = []
  idToCheck.value = []
  gameCompleted.value = false
  stars.value = [false, false, false]
  countStars.value = 0
  moves.value = 0
  seconds.value = 0
  minutes.value = 0
  buttonNotClickable.value = false
  startGame()
  interval.value = createInterval()
/*   const restartGameTime = setInterval(() => {
    if (!gameCompleted.value) {
      seconds.value < 59 ? seconds.value = seconds.value + 1 : (seconds.value = 0, minutes.value = minutes.value + 1),
      printTime
    }
    else clearInterval(restartGameTime)
  }, 1000) */
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
  stars.value = [false, false, false]
  countStars.value = 0
  cards.value[id1] = { ...cards.value[id1], turnCard: false }
  cards.value[id2] = { ...cards.value[id2], turnCard: false }
  moves.value++
}

const verifyCard = (id: number) => {
  cards.value[id] = { ...cards.value[id], verified: true }
}

const isCompleted = () => {
  cards.value.filter(el => el.verified === true).length === cards.value.length ? gameCompleted.value = true : false
}

const compareCardValues = (id: number) => {
  !idToCheck.value.find(el => el === id) ? idToCheck.value.push(id) : id

  if (idToCheck.value.length === 2) {
    buttonNotClickable.value = true
    const card1Id = idToCheck.value[0]
    const card2Id = idToCheck.value[1]

    if (cards.value[card1Id].cardIcon === cards.value[card2Id].cardIcon && cards.value[card1Id].cardId !== cards.value[card2Id].cardId) {
      verifyCard(card1Id)
      verifyCard(card2Id)

      stars.value[countStars.value] = true
      countStars.value < 2 ? countStars.value++ : countStars.value
      moves.value++
      isCompleted()
      setTimeout(() => {
        buttonNotClickable.value = false
      }, 1000)
    }

    else {
      setTimeout(() => {
        coverCardsNotCompatible(card1Id, card2Id)
        buttonNotClickable.value = false
      }, 1000)
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

const printTime = () => {
  if (minutes.value < 10 && seconds.value < 10) return '0' + minutes.value.toString() + ':' + '0' + seconds.value.toString()
  else if (minutes.value < 10 && seconds.value >= 10) return '0' + minutes.value.toString() + ':' + seconds.value.toString()
  else if (minutes.value >= 10 && seconds.value < 10) return minutes.value.toString() + ':' + '0' + seconds.value.toString()
  else return minutes.value.toString() + ':' + seconds.value.toString()
}

startGame()

</script>

<template>
  <div class="container-custom w-screen h-screen flex flex-col items-center justify-start p-2 xs:p-8 sm:p-8 md:p-0 md:justify-start">
    <div v-if="!gameCompleted" class="w-full sm:w-365 md:w-660">
      <HeaderWrapper :stars="stars" :moves="moves" :time="printTime()" @send-reset="restartGame" />
      <CardWrapper :cards="cards" @send-value-to-app="checkCardValues" />
    </div>
    <div v-if="gameCompleted" class="flex flex-col items-center justify-start">
      <img src="/images/check.png" />
      <h1 class="my-6 text-black text-5xl">You are a Winner!</h1>
      <p class=" my-4 text-black text-3xl">
        You won in {{ minutes.toString() }} minutes, {{ seconds.toString() }} seconds, using {{ moves.toString() }}, for
        {{ countStars.toString() }} stars
      </p>
      <button class="p-10-custom bg-light-green text-black" @click="restartGame">Play another game!</button>
    </div>
  </div>
</template>

<style scoped>
.container-custom {
  background-image: url('/images/Geometry.png');
}
</style>
