<template>
    <div class="my-4 bg-gradient-gray-light border border-gray-400 p-4 w-full max-w-md">
        <h2 class="text-lg text-gray-700 mb-4">Leave your comments here</h2>
        <form class="" @submit.prevent="addComment"> 
            <div class="w-full mb-6">
                <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="email">
                    Email
                </label>
                <input v-model="userEmail" class="appearance-none block w-full text-gray-700 border border-gray-400 rounded-sm py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email">
            </div>
            <div class="w-full mb-6">
                <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="comment">
                    Comment
                </label>
                <textarea v-model="comment" class="appearance-none block w-full text-gray-700 border border-gray-400 rounded-sm py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="comment" />
            </div>
            <button class="flex-shrink-0 bg-gradient-gray-light hover:bg-gradient-gray-dark border-gray-500 hover:border-teal-700 text-sm border text-gray-900 py-2 px-2 rounded-sm" type="submit">
                Submit
            </button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        topic: Object
    },

    data() {
        return {
            userEmail: null,
            comment: null,
        }
    },

    methods: {
        addComment() {

        }
    }
}
</script>