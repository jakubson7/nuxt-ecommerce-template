<script setup lang="ts">
const multiple = ref(1);
const a = ref(1);
</script>

<template>
  <UContainer class="flex justify-center items-center p-6 flex-col gap-4">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="sm"
      color="white"
      :trailing="false"
      type="number"
      v-model="multiple"
    />
    <UButton color="white" @click="a += multiple">+</UButton>
    <UButton color="black" @click="a -= multiple">-</UButton>

    {{ $t("test.welcome") }}
    {{ a }}
  </UContainer>
</template>
