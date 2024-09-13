<script setup lang="ts">
import {ref} from "vue";
import steps from "./assets/steps.json";
import Sound from "./util/sound.ts";

interface step {
  title: string;
  description: string;
  sound?: string;
  duration: number;
  voice: {
    text: string;
    sound?: string;
    duration: number;
  }[];
}

const step = ref<number>(0);
const overlay = ref<boolean>(false);
const currentVoice = ref<number | null>(null);
const voiceProgress = ref<number>(0);

let voiceTimeout: number | null = null;
let voiceProgressInterval: number | null = null;
let overlayTimeout: number | null = null;

async function onSelectStep(index: number) {
  if (voiceTimeout) { clearTimeout(voiceTimeout); }
  if (overlayTimeout) { clearTimeout(overlayTimeout); }
  if (voiceProgressInterval) { clearInterval(voiceProgressInterval); }
  step.value = index;
  overlay.value = true;
  currentVoice.value = null;
  const currentStep = steps[step.value] as step;
  try {
    await Sound.playAudio(`./voicelines/${currentStep.sound}`);
  } catch (e) {
    Sound.readTTS(currentStep.title + '. ' + currentStep.description);
  }
  overlayTimeout = setTimeout(() => {
    overlay.value = false;
    startVoice();
  }, steps[step.value].duration * 1000);
}


async function startVoice(index: number = 0) {
  if (voiceTimeout) { clearTimeout(voiceTimeout); }
  if (voiceProgressInterval) { clearInterval(voiceProgressInterval); }
  voiceProgress.value = 0;
  currentVoice.value = index;
  const currentVoiceStep = steps[step.value].voice[index] as step['voice'][0];
  try {
    await Sound.playAudio(`./voicelines/${currentVoiceStep.sound}`)
  } catch (e) {
    Sound.readTTS(currentVoiceStep.text);
  }
  voiceTimeout = setTimeout(() => {
    if (index < steps[step.value].voice.length - 1) {
      startVoice(index + 1);
    } else {
      currentVoice.value = null;
    }
  }, steps[step.value].voice[index].duration * 1000);
  voiceProgressInterval = setInterval(() => {
    voiceProgress.value += 0.1;
    if (voiceProgress.value >= steps[step.value].voice[index].duration) {
      voiceProgress.value = 0;
    }
  }, 100);
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
      <div class="voiceline" :class="{'active': currentVoice !== null}">
        <p>{{(currentVoice !== null && steps[step]?.voice[currentVoice]?.text) || ''}}</p>
        <progress v-if="currentVoice !== null" :max="steps[step]?.voice[currentVoice]?.duration" :value="voiceProgress"></progress>
      </div>
    </div>
    <div class="slider">
      <span class="step" v-for="(_s, index) in steps" :key="index" @click="onSelectStep(index)">{{index + 1}}</span>
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

.voiceline {
  background-color: #00000099;
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s;
}

.voiceline.active {
  opacity: 1;
}

.voiceline p {
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}

.voiceline progress {
  width: 100%;
  height: 5px;
  border-radius: 0;
  background-color: #00000000;
  color: #fff;
  border: none;
  appearance: none;
  outline: none;
}

.voiceline progress::-webkit-progress-bar {
  background-color: #00000000;
}

.voiceline progress::-webkit-progress-value {
  background-color: #fff;
}

.voiceline progress::-moz-progress-bar {
  background-color: #fff;
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
