<script setup lang="ts">
import { computed, defineEmits, defineProps, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch, withDefaults, defineExpose } from 'vue';
import { Color, MOUSE, type ColorRepresentation } from "three";
import {
	GeneralModeExtension,
	MetaManager,
	OrbitControllerExtension,
	SceneManager,
	viewerStore, Ui,
} from 'tangl-viewer';
import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
i18next.use(LanguageDetector).init({
	fallbackLng: ["en", "ru"],
	supportedLngs: ["en", "ru"],
})
Ui.setI18next(i18next)


const model = ref({
	id: 'f1726453-b2c3-2c74-134f-3a0e833e8485',
	name: 'viewer',
});
let sceneManager = new SceneManager().setServer('https://t-model.gcetalon.info');
let metaManager = new MetaManager().setServer('https://t-model.gcetalon.info', 'https://t-cache.gcetalon.info');
let renderManager = viewerStore.createRenderManager('default', sceneManager)!;

onMounted(init);

async function init() {
	renderManager?.init('default', 'cube');
  renderManager.extMan.addExtension(GeneralModeExtension);
	renderManager.extMan.addExtension(OrbitControllerExtension);

	renderManager.extMan.selectControllerExtension("orbit");
  renderManager.extMan.selectModeExtension('general');
	sceneManager
		.onAllLoaded(() => {
		})
		.load(model.value.id);
	await metaManager.load([model.value]);
}

function destroy() {
  renderManager?.destroy();
  sceneManager?.clear();
  metaManager?.destroy();
}

onUnmounted(destroy);

</script>

<template>
  <div class="wrapper">
    <div id="default" style="width: 600px; height: 400px;"></div>
    <div id="cube" ></div>
  </div>
</template>
<style>
.wrapper{
  width: 600px; 
  height:400px;
  position: relative;
}
#cube {
  position: absolute;
  width: 200px;
  height: 135px;
  touch-action: none;
  cursor: default;
  bottom: 0px;
  right: 0px;
}
</style>

