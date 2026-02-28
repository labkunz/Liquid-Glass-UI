<script setup lang="ts">
import { GlassFilterProvider } from '@liquid/ui'
import NavbarSection from './components/NavbarSection.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesSection from './components/FeaturesSection.vue'
import DemoSection from './components/DemoSection.vue'
import ShowcaseSection from './components/ShowcaseSection.vue'
import QuickStartSection from './components/QuickStartSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <GlassFilterProvider>
    <!-- Animated background blobs -->
    <div
      class="blob blob-purple"
      aria-hidden="true"
    />
    <div
      class="blob blob-pink"
      aria-hidden="true"
    />
    <div
      class="blob blob-blue"
      aria-hidden="true"
    />

    <div class="content-layer">
      <NavbarSection />
      <main>
        <HeroSection id="hero" />
        <FeaturesSection id="features" />
        <DemoSection id="demos" />
        <ShowcaseSection id="showcase" />
        <QuickStartSection id="quick-start" />
      </main>
      <FooterSection />
    </div>
  </GlassFilterProvider>
</template>

<style scoped>
.content-layer {
  position: relative;
  z-index: 1;
}

.blob {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.28;
  pointer-events: none;
  z-index: 0;
}

.blob-purple {
  width: 600px;
  height: 600px;
  background: #a78bfa;
  top: -150px;
  left: -100px;
  animation: blobFloat1 12s ease-in-out infinite;
}

.blob-pink {
  width: 500px;
  height: 500px;
  background: #f472b6;
  top: 30%;
  right: -120px;
  animation: blobFloat2 15s ease-in-out infinite;
}

.blob-blue {
  width: 450px;
  height: 450px;
  background: #60a5fa;
  bottom: 10%;
  left: 5%;
  animation: blobFloat3 10s ease-in-out infinite;
}
</style>
