<script setup lang="ts">
import { onMounted, onUnmounted, ref, onUpdated, watchEffect, computed } from "vue";
import { COMEntity, DIVE } from "@shopware-ag/dive";
import steps from "./assets/steps.json";
import Sound from "./util/sound.ts";
import * as THREE from 'three';

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

const started = ref<boolean>(false);
let diveInstance = null as DIVE | null;

let textureAlbedo: THREE.Texture | null = null;
let textureNormal: THREE.Texture | null = null;
let textureMetalness: THREE.Texture | null = null;
let textureRoughness: THREE.Texture | null = null;

const texturesLoaded = ref<boolean>(false);
Promise.all([
  new THREE.TextureLoader().loadAsync('../assets/image/albedo.png'),
  new THREE.TextureLoader().loadAsync('../assets/image/normal.png'),
  new THREE.TextureLoader().loadAsync('../assets/image/metalness.png'),
  new THREE.TextureLoader().loadAsync('../assets/image/roughness.png')
]).then((textures: [THREE.Texture, THREE.Texture, THREE.Texture, THREE.Texture]) => {
  textureAlbedo = textures[0];
  textureNormal = textures[1];
  textureMetalness = textures[2];
  textureRoughness = textures[3];
  texturesLoaded.value = true;
});

const step = ref<number>(0);
const overlay = ref<boolean>(false);
const currentVoice = ref<number | null>(null);
const voiceProgress = ref<number>(0);

const voiceProgressPercentage = computed(() => {
  if (currentVoice.value === null) {
    return 0;
  }
  return (voiceProgress.value / steps[step.value].voice[currentVoice.value as number].duration) * 100;
});

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

function stopVoice() {
  if (voiceTimeout) { clearTimeout(voiceTimeout); }
  if (voiceProgressInterval) { clearInterval(voiceProgressInterval); }
  currentVoice.value = null;
  voiceProgress.value = 0;
  Sound.stopCurrentAudio();
}

function start() {
  if (started.value) {
    return;
  }
  started.value = true;
  onSelectStep(0);
}

function keyEventListener(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowRight':
      onSelectStep(step.value + 1);
      break;
    case 'ArrowLeft':
      onSelectStep(step.value - 1);
      break;
    case 'Space':
    case 'Enter':
      start();
      break;
    case 'Escape':
      stopVoice();
      break;
  }
}


onUnmounted(() => {
  window.document.removeEventListener('keydown', keyEventListener);
});

let model: COMEntity | null = null;

watchEffect(() => {
  console.log('started', started.value, diveInstance, texturesLoaded.value);
  if (started.value && !diveInstance && texturesLoaded.value) {
    diveInstance = DIVE.QuickView("/models/GDIsMyPassion.glb");
    const mainCanvasWrapper = document.getElementById('MainCanvas');
    diveInstance.Communication.PerformAction('UPDATE_SCENE', { floorEnabled: false });
    const map = diveInstance.Communication.PerformAction('GET_ALL_OBJECTS', new Map());
    const [light, cubeModel] = map.values();
    model = cubeModel;

    diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
      id: model.id,
      material: {
        color: 0x999999,
        map: null,
        roughnessMap: null,
        metalnessMap: null,
      }
    });

    mainCanvasWrapper?.appendChild(diveInstance.Canvas);
    window.document.addEventListener('keydown', keyEventListener);
  }
}, { flush: 'post' });

watchEffect(() => {
  console.log(step.value);
  if (!diveInstance) return;
  if (!model) return;

  switch (step.value) {
    case 0: // geometry only
      diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
        id: model.id,
        material: {
          color: 0x999999,
          vertexColors: false,
          map: null,
          normalMap: null,
          roughnessMap: null,
          metalnessMap: null,
        }
      });
      break;
    case 1: // vertex colors
      diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
        id: model.id,
        material: {
          color: 0xffffff,
          vertexColors: true,
          map: null,
          normalMap: null,
          roughnessMap: null,
          metalnessMap: null,
        }
      });
      break;
    case 2: // albedo
      diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
        id: model.id,
        material: {
          color: 0xffffff,
          vertexColors: false,
          map: textureAlbedo,
          normalMap: null,
          roughnessMap: null,
          metalnessMap: null,
        }
      });
      break;
    case 3: // normal
      diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
        id: model.id,
        material: {
          color: 0xffffff,
          vertexColors: false,
          map: textureAlbedo,
          normalMap: textureNormal,
          metalnessMap: null,
          roughnessMap: null,
        }
      });
      break;
    case 4: // metalness
      diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
        id: model.id,
        material: {
          color: 0xffffff,
          vertexColors: false,
          map: textureAlbedo,
          normalMap: textureNormal,
          metalnessMap: textureMetalness,
          roughnessMap: null,
        }
      });
      break;
    case 5:
      diveInstance.Communication.PerformAction('UPDATE_OBJECT', {
        id: model.id,
        material: {
          color: 0xffffff,
          vertexColors: false,
          map: textureAlbedo,
          normalMap: textureNormal,
          metalnessMap: textureMetalness,
          roughnessMap: textureRoughness,
        }
      });
      break;
  }
});

</script>

<template>
  <main v-if="started">
    <div id="MainCanvas">
    </div>
    <div class="overlay" :class="{ 'active': overlay }">
      <h1>{{ steps[step].title }}</h1>
      <p>{{ steps[step].description }}</p>
    </div>
    <div class="voice">
      <div class="voiceline" :class="{ 'active': currentVoice !== null }">
        <p>{{ (currentVoice !== null && steps[step]?.voice[currentVoice]?.text) || '' }}</p>
        <div class="progress">
          <div class="progress-bar" :style="{ width: voiceProgressPercentage + '%' }"></div>
        </div>
        <span class="close" @click="stopVoice">x</span>
      </div>
    </div>
    <div class="slider">
      <span class="step" :class="{ 'current': index === step }" v-for="(_s, index) in steps" :key="index"
        @click="onSelectStep(index)">{{ index + 1 }}</span>
    </div>
  </main>
  <div v-else class="start-screen">
    <button @click="start">Start</button>
  </div>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
}

#MainCanvas {
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
  position: relative;
}

.voiceline.active {
  opacity: 1;
}

.voiceline p {
  margin: 0;
  padding: 10px;
}

.voiceline .progress {
  width: 100%;
  height: 5px;
  border-radius: 0;
  background-color: #00000000;
  border: none;
  appearance: none;
  outline: none;
}

.voiceline .progress .progress-bar {
  height: 100%;
  background-color: #444;
  transition: width 0.1s linear;
}

.voiceline span.close {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  width: 25px;
  height: 25px;
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 25px;
  border-radius: 50%;
  cursor: pointer;
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

.step.current {
  background-color: #fff;
  color: #000;
}

.start-screen {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-screen button {
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
