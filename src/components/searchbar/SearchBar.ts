import { watch, defineComponent, onMounted, ref, computed } from 'vue';
import SearchResults from '@/components/search-results/SearchResults.vue';
import { usePlacesStore } from '../../composables/usePlacesStore';
import SearchForm from '../search-form/SearchForm.vue';
import StepperReservation from '../stepper/Stepper-Reservation.vue';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';

export default defineComponent({
    name: 'SearchBar',
    components: { TabsContent, TabsIndicator, TabsList, TabsTrigger, StepperReservation, SearchResults, SearchForm },
    setup() {
        const searcherTimeout = ref();
        const searcherValue = ref('');
        const { searchPlacesByTerm } = usePlacesStore();

        // State to manage current step or page transition
        const currentStep = ref(1);

        // Function to handle the event when a place is selected
        const onPlaceSelected = (place: any) => {
            console.log("Selected Place:", place);
            currentStep.value = 2; // Move to the next step (adjust as needed)
        };

        return {
            searcherValue,
            currentStep,
            onPlaceSelected,
            searchTerm: computed({
                get() {
                    return searcherValue.value;
                },
                set(val: string) {
                    if (searcherTimeout.value) clearTimeout(searcherTimeout.value);

                    searcherTimeout.value = setTimeout(() => {
                        searcherValue.value = val;
                        searchPlacesByTerm(val);
                    }, 1000);
                }
            })
        };
    }
});
