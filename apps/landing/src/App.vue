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
    <NavbarSection />
    <main>
      <HeroSection id="hero" />
      <FeaturesSection id="features" />
      <DemoSection id="demos" />
      <ShowcaseSection id="showcase" />
      <QuickStartSection id="quick-start" />
    </main>
    <FooterSection />
  </GlassFilterProvider>
</template>
