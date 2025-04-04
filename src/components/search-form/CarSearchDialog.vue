<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['update:selected-car']);

// Reactive state to track selected filters
const selectedFilters = ref({
    drivetrain: [],
    region: []
});

// Function to toggle selection
const toggleFilter = (category, value) => {
    if (selectedFilters.value[category].includes(value)) {
        selectedFilters.value[category] = selectedFilters.value[category].filter(item => item !== value);
    } else {
        selectedFilters.value[category].push(value);
    }
};

// Sample vehicle data
const vehicles = ref([
    {
        id: '646ca7235452611fc99432b0',
        name: 'Toyota RAV 4',
        type: 'Toyota',
        img: 'https://catalogue.automobile.tn/big/2023/04/46056.png?t=1727028068',
        selected: true,
        expanded: false
    },
    {
        id: '638157687592b0f2c57fc08f',
        name: 'Mercedes Vito',
        type: 'Mercedes',
        img: 'https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL01FUkNFREVTL1ZJVE8vNDQwMjlfVkFOLTQtRE9PUlMvbWVyY2VkZXMtYmVuei12aXRvLXRvdXJlci1mcm9udC12aWV3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=',
        selected: false,
        expanded: false
    },
    {
        id: '6731c0d440e03449fc079914',
        name: 'Mercedes Class V',
        type: 'Mercedes',
        img: 'https://catalogue.automobile.tn/big/2024/05/47140.png?t=1715188513',
        selected: false,
        expanded: false
    },
    {
        id: '6731c0d20e68fb49fcfcfc43',
        name: 'Kia NERO',
        type: 'KIA',
        img: 'https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/niro-sg2/discover/kia-niro-ev-sx-my23-trim.png',
        selected: false,
        expanded: false
    },
    {
        id: '6731c0d20e68fb49fcfcfc43',
        name: 'Lexus NX 300',
        type: 'Lexus',
        img: 'https://www.fmdt.info/vehicle/lexus/2019/nx-300-32-white.png',
        selected: false,
        expanded: false
    }
]);


const toggleSelection = (selectedVehicle) => {
    vehicles.value.forEach(vehicle => vehicle.selected = false); 
    selectedVehicle.selected = true;
    emit('update:selected-car', selectedVehicle); // Emit selected car to parent
};

// Function to toggle vehicle details
const toggleDetails = (vehicle) => {
    vehicle.expanded = !vehicle.expanded;
};
</script>


<template>
    <div class="flex h-full w-full flex-col">
        <div class="wl-vehicle-filters relative flex max-h-full w-full flex-1 flex-col overflow-hidden">
            <div class="z-20 flex flex-col gap-y-4 border-b border-solid border-subdued bg-subdued py-4">
           
                <div class="hidden gap-x-2 px-3 md:flex md:px-4">
                    <!-- EV -->
                    <label for="drivetrain-BEV" @click="toggleFilter('drivetrain', 'EV')"
                        class="relative inline-flex cursor-pointer items-center justify-center gap-1 rounded-full py-1.5 text-sm font-medium border px-3"
                        :class="selectedFilters.drivetrain.includes('EV') ? 'border-blue-500 bg-blue-100 text-blue-600' : 'border-gray-300 text-gray-700 hover:border-gray-500'">
                        <span>Toyota</span>
                        <input id="drivetrain-BEV" type="checkbox" class="absolute inset-0 appearance-none">
                    </label>

                    <!-- Hybrid -->
                    <label for="drivetrain-HEV" @click="toggleFilter('drivetrain', 'Hybrid')"
                        class="relative inline-flex cursor-pointer items-center justify-center gap-1 rounded-full py-1.5 text-sm font-medium border px-3"
                        :class="selectedFilters.drivetrain.includes('Hybrid') ? 'border-green-500 bg-green-100 text-green-600' : 'border-gray-300 text-gray-700 hover:border-gray-500'">
                        <span>Mercedes</span>
                        <input id="drivetrain-HEV" type="checkbox" class="absolute inset-0 appearance-none">
                    </label>

                    <!-- EU -->
                    <label for="region-EU" @click="toggleFilter('region', 'EU')"
                        class="relative inline-flex cursor-pointer items-center justify-center gap-1 rounded-full py-1.5 text-sm font-medium border px-3"
                        :class="selectedFilters.region.includes('EU') ? 'border-yellow-500 bg-yellow-100 text-yellow-600' : 'border-gray-300 text-gray-700 hover:border-gray-500'">
                        <span>KIA</span>
                        <input id="region-EU" type="checkbox" class="absolute inset-0 appearance-none">
                    </label>

                    <!-- US -->
                    <label for="region-NA" @click="toggleFilter('region', 'US')"
                        class="relative inline-flex cursor-pointer items-center justify-center gap-1 rounded-full py-1.5 text-sm font-medium border px-3"
                        :class="selectedFilters.region.includes('US') ? 'border-red-500 bg-red-100 text-red-600' : 'border-gray-300 text-gray-700 hover:border-gray-500'">
                        <span>LEXUS</span>
                        <input id="region-NA" type="checkbox" class="absolute inset-0 appearance-none">
                    </label>
                </div>
            </div>
            <div class="relative h-full overflow-auto">
                <ul class="pb-4">
                    <li class="flex w-full flex-col gap-y-2 pt-2">
                        <div class="sticky top-0 z-10 bg-body px-3 py-2 text-sm font-semibold md:px-4 has-shadow">
                            Véhicules
                        </div>
                        <ul class="flex flex-col gap-y-2 px-3 md:px-4">
                            <li v-for="vehicle in vehicles" :key="vehicle.id"
                                class="rounded-lg bg-subdued transition-colors hover:bg-base cursor-pointer"
                                @click="toggleSelection(vehicle)">
                                <div class="flex w-full items-center px-3 py-2">
                                    <div class="flex w-full items-center gap-x-3 md:w-auto md:flex-1">
                                        <div class="h-12 w-[84px] shrink-0">
                                            <img :alt="vehicle.name" :title="vehicle.name" class="block w-full"
                                                :src="vehicle.img" />
                                        </div>
                                        <div class="flex grow flex-col">
                                            <div class="text-sm font-medium">{{ vehicle.name }}</div>
                                            <div class="text-sm font-normal leading-5 text-alt2">{{ vehicle.type }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mb-1 mt-3 flex shrink-0 flex-row items-center gap-x-2 md:mb-0 md:mt-0">
                                        <!-- Selected Indicator (Only Appears When Selected) -->
                                        <div v-if="vehicle.selected"
                                            class="flex max-w-fit items-center truncate text-xs font-semibold leading-4 bg-success-alt2/10 text-success px-1.5 py-0.5 rounded-full">
                                            Selected
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                                                viewBox="0 0 20 20">
                                                <path fill="#252A32"
                                                    d="M15.51 5.95a.75.75 0 0 1 .04 1.06L9.2 13.848a.95.95 0 0 1-1.41-.021L4.435 9.994a.75.75 0 1 1 1.128-.988l2.953 3.374 5.933-6.39a.75.75 0 0 1 1.06-.04" />
                                            </svg>
                                        </div>

                                        <!-- Toggle Button -->
                                        <button type="button"
                                            class="wl-button inline-flex min-w-6 cursor-pointer items-center justify-center border border-transparent text-sm font-semibold leading-5 text-white no-underline outline outline-transparent transition-transform duration-300 rounded-full aspect-square"
                                            :class="{ 'rotate-180': vehicle.expanded }"
                                            aria-label="Show vehicle details" @click.stop="toggleDetails(vehicle)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"
                                                viewBox="0 0 16 16">
                                                <path stroke="#252A32" stroke-linecap="round" stroke-linejoin="round"
                                                    stroke-width="1.5" d="M4.8 7.2 8 10.4l3.2-3.2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
