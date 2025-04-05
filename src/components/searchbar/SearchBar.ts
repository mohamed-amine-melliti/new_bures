import { defineComponent, ref, computed } from 'vue';
import SearchResults from '@/components/search-results/SearchResults.vue';
import { usePlacesStore } from '../../composables/usePlacesStore';
import StepperReservation from '../stepper/Stepper-Reservation.vue';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';

export default defineComponent({
  name: 'SearchBar',
  components: {
    TabsContent,
    TabsIndicator,
    TabsList,
    TabsTrigger,
    StepperReservation,
    SearchResults,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Recherchez un lieu et choisissez la destination !',
    },
  },
  setup(props) {
    const searchInput = ref('');
    const searchResults = ref<any[]>([]);
    const searcherTimeout = ref<any>(null);
    const { searchPlacesByTerm } = usePlacesStore(); // assuming this returns a Promise or data
  
    const searchTerm = computed({
      get: () => searchInput.value,
      set: (val: string) => {
        searchInput.value = val;
  
        if (searcherTimeout.value) clearTimeout(searcherTimeout.value);
        searcherTimeout.value = setTimeout(async () => {
          const results = await searchPlacesByTerm(val);
          searchResults.value = results; // store locally
        }, 500);
      }
    });
  
    return {
      searchTerm,
      searchResults,
    };
  }
  
});
