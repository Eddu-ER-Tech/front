<script setup>

import { useToastStore } from '@/store/toast'
const store = useToastStore()

</script>

<template>
    <div v-if="store.isVisible" class="transition ease-in-out delay-500 duration-500  toast-container position-fixed bottom-0 end-0 p-3" :class="store.classes">
        {{ store.message }}
        

    </div>

</template>