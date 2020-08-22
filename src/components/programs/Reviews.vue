<template>
    <div class="my-4 bg-gradient-gray-light border border-gray-400 p-4 w-full text-gray-700">
        <h2 class="text-lg mb-4">Ratings</h2>
        <div v-if="!isLoading">
            <div v-if="ratings.ratings.length > 0" class="mb-4">
                <div class="text-xs uppercase tracking-wider flex items-center">
                    <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= ratings.summary.rating ? 'text-yellow-600' : 'text-gray-400'" class="h-4 w-4 fill-current">
                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                    </svg>
                    <span class="ml-2">{{ ratings.summary.count}} ratings</span>
                    <span class="ml-2">{{ ratings.summary.comments}} comments</span>
                    <svg @click="showComments = !showComments" class="ml-2 h-4 w-4 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path class="up" v-if="showComments" d="M5 15l7-7 7 7"></path>
                        <path class="down" v-if="!showComments" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                <div v-if="ratings.summary.comments > 0" class="ml-4 mt-2">
                    <transition-group name="fade">
                        <div v-if="showComments" :key="showComments">
                            <div v-for="rating in ratings.ratings" :key="rating.id" class="px-4 py-2 mb-2 border-l-2 border-teal-500">
                                <div class="flex items-center">
                                    <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" :class="i <= rating.data.stars ? 'text-yellow-600' : 'text-gray-400'" class="h-3 w-3 fill-current">
                                        <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                                    </svg>
                                    <span class="ml-2 text-xs">{{ rating.author_email }}</span>
                                    <span class="ml-2 text-xs">{{ rating.created_at }}</span>
                                </div>
                                <div v-if="rating.data.hasOwnProperty('comment')">
                                    <div class=" text-base">{{ rating.data.comment }}</div>
                                </div>
                                <div v-else class="text-base">
                                    <span>User did not leave a comment</span>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
                <div v-else>
                    <span>No comments</span>
                </div>
            </div>
        </div>
        <div v-else class="mb-4">
            <span>No ratings. Be first to rate this subject</span>
        </div>
        
        <!-- user rating -->
        <div>
            <h2 class="text-lg mb-4">Leave your rating here </h2>
            <form class="ml-4" @submit.prevent="addRating"> 
                <div class="w-full mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="email">
                        Email
                    </label>
                    <input v-model="userEmail" class="appearance-none block w-full max-w-md text-gray-700 border border-gray-400 rounded-sm py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" :disabled="signedIn">
                </div>
                <div class="w-full mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="comment">
                        Select
                    </label>
                    <div class="flex items-center">
                        <svg v-for="i in 5" :key="i" @click="selectedStar = i" viewBox="0 0 24 24" :class="i <= selectedStar ? 'text-yellow-600' : 'text-gray-400'" class="h-4 w-4 fill-current cursor-pointer">
                            <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                        </svg>
                    </div>
                </div>
                <div class="w-full mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs mb-1" for="email">
                        Comment
                    </label>
                    <input v-model="comment" class="appearance-none block w-full max-w-md text-gray-700 border border-gray-400 rounded-sm py-2 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="comment" type="text">
                </div>
                <button :class="ratingBtnDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gradient-gray-dark hover:border-teal-700'"  class="flex-shrink-0 bg-gradient-gray-light border-gray-500 text-sm border text-gray-900 py-2 px-2 rounded-sm" type="submit" :disabled="ratingBtnDisabled">
                    Submit
                </button>
            </form>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        object: String, // -> subject, regulation, scheme
        id: Number,
    },

    computed: {
        fetchedSubjectRatings() {
            return this.$store.getters.fetchedSubjectRatings(this.id)
        },

        ratings() {
            switch (this.object) {
                case 'subject':
                    if (this.fetchedSubjectRatings) {
                        return this.$store.getters.getSubjectRatings(this.id) || []
                    }
                    break
            }
        },

        signedIn() {
            return this.$store.getters.signedIn
        },

        errorEmail() {
            return this.userEmail.trim() == "" || !this.userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        },

        errorStars() {
            return this.selectedStar == 0
        },

        ratingBtnDisabled() {
            return this.errorEmail || this.errorStars
        }
    },

    data() {
        return {
            isLoading: false,
            isError: false,
            showComments: true,
            selectedStar: 0,
            user: null,
            userEmail: "",
            comment: "",
        }
    },

    created() {
        if (!this.fetchedSubjectRatings) {
            this.getSubjectRatings
        }

        if(this.signedIn) {
            this.user = this.$store.user
            this.userEmail = this.user.email
        }
    },

    methods: {
        async getSubjectRatings() {
            await this.$store.dispatch('doFetchSubjectRatings', this.id)
        },

        addRating() {
            let vm = this
            vm.$store.dispatch('doAddRating', {
                subject_id: vm.id,
                author_email: vm.userEmail,
                stars: vm.selectedStar,
                comment: vm.comment,
            })
            .then(response => {
                vm.userEmail = ""
                vm.selectedStar = 0
                vm.comment = ""

            })
            .catch(error => {
                console.log(error)
            })
        },
    }, // end of methods

    watch: {
        id: {
            immediate: true,
            handler(val, oldVal) {
                let vm = this
                if (!vm.fetchedSubjectRatings) {
                    vm.isLoading = true
                    vm.getSubjectRatings()
                        .catch((e) => {
                            console.error(e)
                        })
                        .finally(() => {
                            vm.isLoading = false
                        })
                }
            }
        },
    }, // end of watch
}
</script>

<style scoped>
    .fade-enter-active {
        transition: all .5s ease;
    }
    .fade-leave-active {
        transition: all .4s ease-in-out;
    }
    .fade-enter, .fade-leave-to
    {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>