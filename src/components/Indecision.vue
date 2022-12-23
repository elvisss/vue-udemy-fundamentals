<template>
  <img v-if="image" :src="image" alt="gb" />
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input v-model="question" type="text" name="" id="" placeholder="Hazme una pregunta" />
    <p>Recuerda termina con un signo de interrogación (?)</p>

    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ computedAnswer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: '',
      answer: '',
      image: '',
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Pensando...'
      const { answer, image } = await fetch('https://yesno.wtf/api').then(r => r.json())
      this.answer = answer
      this.image = image
      /* this.question = '' */
    }
  },
  computed: {
    computedAnswer() {
      if (this.answer === 'yes') {
        return 'si'
      }
      return 'no'
    }
  },
  watch: {
    question(value, _oldValue) {
      this.isValidQuestion = false
      if (!value.includes('?')) return
      this.isValidQuestion = true
      this.getAnswer()
    }
  }
}
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 20px;
  margin-top: 0px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
