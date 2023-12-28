<template>
  <footer class="flex bg-dark text-xs h-5 justify-between items-center border-t border-zinc-900">
      <div class="flex items-center h-full">
          <slot name="left"></slot>
      </div>
      <div class="flex items-center h-full">
          <slot name="right"></slot>
      </div>
  </footer>
</template>
