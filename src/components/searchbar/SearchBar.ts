import { watch, defineComponent, onMounted, ref, computed } from 'vue';
import SearchResults from '@/components/search-results/SearchResults.vue';
import { usePlacesStore } from '../../composables/usePlacesStore';
import SearchForm from '../search-form/SearchForm.vue';
import StepperReservation from '../stepper/Stepper-Reservation.vue';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

export default defineComponent({
    name: 'SearchBar',
    components: { TabsContent,TabsIndicator,TabsList,TabsTrigger, StepperReservation, SearchResults , SearchForm},
    setup(){

        const searcherTimeout = ref()
        const searcherValue = ref('')
        const { searchPlacesByTerm } = usePlacesStore()
        return{
            searcherValue,
            searchTerm: computed({
                get(){
                    return searcherValue.value
                },
                set(val: string){
                    // clean time out each time the user searchs something
                    if( searcherTimeout.value ) clearTimeout( searcherTimeout.value )

                    searcherTimeout.value = setTimeout(() => {
                        searcherValue.value = val
                        searchPlacesByTerm(val)
                    }, 1000);
                }
            })
        }
    }
})