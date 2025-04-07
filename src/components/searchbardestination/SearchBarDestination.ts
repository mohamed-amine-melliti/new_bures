import { defineComponent } from 'vue';
import SearchResults from '@/components/search-results/SearchResults.vue';
import { useSearchPlaces } from '@/composables/useSearchPlaces';

import StepperReservation from '../stepper/Stepper-Reservation.vue';
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui';

export default defineComponent({
  name: 'SearchBarDestination',
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
  setup() {
    const { searchTerm, searchResults } = useSearchPlaces(); // ✅ Each component gets its own state

    return {
      searchTerm,
      searchResults,
    };
  }
});
