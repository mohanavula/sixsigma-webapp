<template>
    <div class="container px-4 pt-1">
        <div class="flex justify-start">
            <div v-if="isLoading">
                <h2>Please wait...</h2>
            </div>
            <div v-else>
                <div class="mb-3">
                    <span class="text-xl tracking-wider truncate mb-2">Classes</span>
                    <span class="font-normal text-xs ml-3">Manager</span>
                </div>
                <div class="flex justify-start"> <!-- stats -->
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Active Classes</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ active_classes }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Active Sections</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ active_sections }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Working Days Held</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ working_days_held }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Working Days Remaining</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ working_days_remaining }}</div>
                    </div>
                    <div class="w-32 shadow-lg rounded-sm bg-gradient-gray-light mr-2 py-1 px-2 border border-gray-500">
                        <div class="w-full text-xs uppercase tracking-wider text-right text-gray-600 border-b border-red-500">Last Working Day</div>
                        <div class="text-xl tracking-wider text-gray-900">{{ last_working_day }}</div>
                    </div>
                </div> <!-- stats end -->

                <div class="flex justify-start mt-6 mb-2"> <!-- explore commands -->
                    <div class="text-xs tracking-wider mr-5">Explore</div>
                    <div v-for="link in exploreLinks" :key="link" class="cursor-pointer w-24 text-xs text-right uppercase tracking-wider mr-3" :class="activeTab == link ? 'border-b-2 border-red-500' : 'border-b border-gray-400'" @click="activeTab = link">{{ link }}</div>
                </div> <!-- explore commands end -->

                <ManageClass v-show="activeTab == 'Classes'" />

            </div>
        </div>
    </div>

</template>

<script>
import ManageClass from "./classes/MaganeClass"
export default {
    components: {
        ManageClass,

    },  // end of components
    
    data() {
        return {
            isLoading: false,
            active_classes: 20,
            active_sections: 40,
            working_days_held: 90,
            working_days_remaining: 10,
            last_working_day: 0,

            exploreLinks: ['Classes', 'Enrollment', 'Workload', 'Schedules', 'Attendance', 'Reports',],
            activeTab: 'Classes',

        }
    }
}
</script>