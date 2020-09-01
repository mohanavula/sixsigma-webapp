<template>
    <div class="mt-4">
        <div v-if="isLoading || isError">
            <div class="flex items-start">
                <div class="w-32">Classes</div>
                <div v-show="isLoading">Fetching...</div>
                <div v-show="isError">{{ error_message }}</div>
            </div>
        </div>

        <div v-else>
            <div class="flex items-start">
                <div class="w-32">Classes</div>
                <div class="flex flex-col">
                    <div v-if="academic_classes.length == 0">
                        No classes found
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            isError: false,
        }
    }
  
}
</script>