<script setup></script>
<template>
  <div
    class="bg-linear-to-r from-saphire-300 to-saphire-100 w-1/2 h-2/3 flex flex-col justify-center items-center rounded-xs p-1 shadow-zinc-900/30 shadow-xl"
  >
    <h2
      class="w-full h-12 text-2xl bg-linear-to-r from-saphire-300 to-saphire-100 flex justify-center items-center pb-1 text-zinc-50"
    >
      <slot name="header">Header</slot>
    </h2>
    <div
      class="flex flex-col justify-center items-center bg-white w-full h-full rounded-xs rounded-t-none p-10"
    >
      <!--  tool here -->
      <slot name="tool"></slot>
    </div>
  </div>
</template>
