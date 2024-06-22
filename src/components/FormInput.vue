<script setup lang="ts">
defineProps<{
    name: string
    modelValue: string
}>();

const emit = defineEmits<{
   (event: 'update:modelValue', value: string): void
}>();

function handleInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
    <div class="field">
        <label :for="name" class="label">{{ name }}</label>
        <div class="control">
            <input type="text" :id="name" class="input" :value="modelValue" @input="handleInput">
        </div>
    </div>
</template>