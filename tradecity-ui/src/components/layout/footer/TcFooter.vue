<template>
  <footer class="flex bg-nav-primary text-small h-5 justify-between items-center w-full">
      <div class="flex items-center h-full">
          <slot name="left"></slot>
      </div>
      <div class="flex items-center h-full">
          <slot name="right"></slot>
      </div>
  </footer>
</template>
