<script setup lang="ts">
/**
 * GlassFilterProvider
 *
 * 提供全域的 SVG Filter 定義，供所有元件引用
 * 需要在 App 最外層使用，確保所有 glass 效果元件都能正常運作
 *
 * Usage:
 * ```vue
 * <GlassFilterProvider>
 *   <App />
 * </GlassFilterProvider>
 * ```
 */
</script>

<template>
  <!-- SVG Filter 定義 -->
  <svg
    style="position: absolute; width: 0; height: 0; pointer-events: none;"
    aria-hidden="true"
  >
    <defs>
      <!-- ==================== Filter 1: Subtle Glass (保守方案) ==================== -->
      <!-- 適用於 Button、Input 等小型元件，折射效果微弱，確保文字可讀 -->
      <filter
        id="glass-subtle"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
      >
        <!-- 產生噪點紋理 -->
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01"
          numOctaves="2"
          seed="1"
          result="turbulence"
        />

        <!-- 模糊噪點，產生柔和效果 -->
        <feGaussianBlur
          in="turbulence"
          stdDeviation="1.5"
          result="blurred"
        />

        <!-- 位移圖 - 模擬折射（參數克制，scale 僅 3） -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="3"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />

        <!-- 高光效果 - 模擬鏡面反射 -->
        <feSpecularLighting
          in="blurred"
          surfaceScale="2"
          specularConstant="0.6"
          specularExponent="20"
          lighting-color="#ffffff"
          result="specular"
        >
          <fePointLight
            x="100"
            y="100"
            z="200"
          />
        </feSpecularLighting>

        <!-- 合成高光與位移後的圖形 -->
        <feComposite
          in="specular"
          in2="displaced"
          operator="in"
          result="composite"
        />

        <!-- 將高光疊加到位移圖上 -->
        <feComposite
          in="displaced"
          in2="composite"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.3"
          k4="0"
        />
      </filter>

      <!-- ==================== Filter 2: Intense Glass (激進方案) ==================== -->
      <!-- 適用於 Card、Modal 等大型浮層元件，折射效果明顯 -->
      <filter
        id="glass-intense"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <!-- 產生更複雜的噪點紋理 -->
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.008"
          numOctaves="3"
          seed="2"
          result="turbulence"
        />

        <!-- 模糊噪點 -->
        <feGaussianBlur
          in="turbulence"
          stdDeviation="2"
          result="blurred"
        />

        <!-- 位移圖 - 明顯的折射效果（scale 12） -->
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="12"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />

        <!-- 更強的高光效果 -->
        <feSpecularLighting
          in="blurred"
          surfaceScale="3"
          specularConstant="0.8"
          specularExponent="25"
          lighting-color="#ffffff"
          result="specular"
        >
          <fePointLight
            x="150"
            y="150"
            z="300"
          />
        </feSpecularLighting>

        <!-- 合成高光 -->
        <feComposite
          in="specular"
          in2="displaced"
          operator="in"
          result="composite"
        />

        <!-- 疊加高光，強度更高 -->
        <feComposite
          in="displaced"
          in2="composite"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.5"
          k4="0"
        />
      </filter>

      <!-- ==================== Filter 3: Highlight Only (只有高光，無位移) ==================== -->
      <!-- 移除 feDisplacementMap，只保留有機高光效果，元素形狀不會被扭曲 -->
      <!-- 適用於 glass-highlight-only 和 glass-highlight-layered variant -->
      <filter
        id="glass-highlight-only"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
      >
        <!-- 產生噪點做為光照法線圖 -->
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012"
          numOctaves="2"
          seed="3"
          result="turbulence"
        />

        <!-- 模糊噪點，讓高光更柔和 -->
        <feGaussianBlur
          in="turbulence"
          stdDeviation="1"
          result="blurred"
        />

        <!-- 有機高光計算（無 feDisplacementMap，不扭曲形狀） -->
        <feSpecularLighting
          in="blurred"
          surfaceScale="2.5"
          specularConstant="0.7"
          specularExponent="22"
          lighting-color="#ffffff"
          result="specular"
        >
          <fePointLight
            x="120"
            y="80"
            z="180"
          />
        </feSpecularLighting>

        <!-- 把高光限制在原始圖形範圍內 -->
        <feComposite
          in="specular"
          in2="SourceGraphic"
          operator="in"
          result="highlight"
        />

        <!-- 將有機高光疊加到原始圖形上，k3 控制高光強度 -->
        <feComposite
          in="SourceGraphic"
          in2="highlight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.35"
          k4="0"
        />
      </filter>

      <!-- ==================== Filter 4: Background Refraction Only ==================== -->
      <!-- 僅對背景層套用，文字層保持清晰 -->
      <filter
        id="glass-backdrop"
        x="-30%"
        y="-30%"
        width="160%"
        height="160%"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.009"
          numOctaves="2"
          result="turbulence"
        />

        <feGaussianBlur
          in="turbulence"
          stdDeviation="2"
          result="blurred"
        />

        <feDisplacementMap
          in="BackgroundImage"
          in2="blurred"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>

  <!-- 插槽：包裹整個應用 -->
  <slot />
</template>

<style scoped>
/* 確保 SVG 不佔據任何空間 */
svg {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
