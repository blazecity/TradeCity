<template>
  <header class="header-grid w-full py-0.5 px-2 z-10 h-7 bg-nav-primary">
    <router-view name="FunctionalityNameArea" class="col-span-2"></router-view>
    <router-view name="FunctionalityContextArea"></router-view>
    <div class="flex gap-2 ml-auto items-center">
      <slot></slot>
    </div>
  </header>
</template>

<style scoped>
.header-grid {
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr auto;
  grid-gap: 10px;
  align-content: center;
}
</style>
