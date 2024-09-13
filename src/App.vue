<script setup lang="ts">
import {ref} from "vue";

const steps = [
  {
    title: "Step 1",
    description: "This is step 1",
    sound: 'transition_1.mp3',
    voice: [{
      text: 'Welcome to the tutorial',
      sound: 'voice_1_1.mp3',
      duration: 5
    }, {
      text: 'This is the first step',
      sound: 'voice_1_2.mp3',
      duration: 5
    }]
  }, {
    title: "Step 2",
    description: "This is step 2",
    sound: 'transition_2.mp3',
    voice: [{
      text: 'This is the second step',
      duration: 5
    }]
  }, {
    title: "Step 3",
    description: "This is step 3",
    voice: [{
      text: 'This is the third step',
      duration: 5
    }]
  }
];

function playSound(track: string) {
  const audio = new Audio(`./voicelines/${track}`);
  audio.play();
}

const step = ref<number>(0);
const overlay = ref<boolean>(false);
const currentVoice = ref<number | null>(null);


let voiceTimeout: NodeJS.Timeout | null = null;
let overlayTimeout: NodeJS.Timeout | null = null;

function onSelectStep(index: number) {
  if (voiceTimeout) { clearTimeout(voiceTimeout); }
  if (overlayTimeout) { clearTimeout(overlayTimeout); }
  step.value = index;
  overlay.value = true;
  if (steps[step.value].sound) {
    playSound(steps[step.value].sound);
  }
  overlayTimeout = setTimeout(() => {
    overlay.value = false;
    startVoice();
  }, 1000);
}

function startVoice(index: number = 0) {
  if (voiceTimeout) { clearTimeout(voiceTimeout); }
  currentVoice.value = index;
  if (steps[step.value].voice[index].sound) {
    playSound(steps[step.value].voice[index].sound);
  }
  voiceTimeout = setTimeout(() => {
    if (index < steps[step.value].voice.length - 1) {
      startVoice(index + 1);
    } else {
      currentVoice.value = null;
    }
  }, steps[step.value].voice[index].duration * 1000);
}
</script>

<template>
  <main>
    <div class="main-canvas">
      Main Canvas
    </div>
    <div class="overlay" :class="{ 'active': overlay }">
      <h1>{{steps[step].title}}</h1>
      <p>{{steps[step].description}}</p>
    </div>
    <div class="voice">
      <p :class="{'active': currentVoice !== null}">{{steps[step]?.voice[currentVoice]?.text || ''}}</p>
    </div>
    <div class="slider">
      <span class="step" v-for="(s, index) in steps" :key="index" @click="onSelectStep(index)">{{index + 1}}</span>
    </div>
  </main>

</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
}

.main-canvas {
  width: 100%;
  height: 100%;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s;
}

.overlay.active {
  opacity: 1;
  pointer-events: all;
}

.voice {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 60px;
}

.voice p {
  background-color: #00000099;
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.5s;
}

.voice p.active {
  opacity: 1;
}

.slider {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
}

.step {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  border-radius: 50%;
}
</style>
