import { defineComponent, ref, computed, watch } from 'vue'
import SearchResults from '@/components/search-results/SearchResults.vue'
import { usePlacesStore } from '../../composables/usePlacesStore'
import StepperReservation from '../stepper/Stepper-Reservation.vue'
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'reka-ui'

export default defineComponent({
  name: 'SearchBar',
  emits: ['update:modelValue'], // ✅ Declare emitted event
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
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const searchInput = ref(props.modelValue)
    const searchResults = ref<any[]>([])
    const searcherTimeout = ref<any>(null)
    const { searchPlacesByTerm } = usePlacesStore()

    const searchTerm = computed({
      get: () => searchInput.value,
      set: (val: string) => {
        searchInput.value = val
        emit('update:modelValue', val)

        if (searcherTimeout.value) clearTimeout(searcherTimeout.value)
        searcherTimeout.value = setTimeout(async () => {
          const results = await searchPlacesByTerm(val)
          searchResults.value = results
        }, 500)
      }
    })

    // ✅ Called when place is selected in SearchResults
    const handlePlaceSelected = (place: any) => {
      const selectedName = place.place_name || place.display_name || ''
      searchTerm.value = selectedName           // update input field
      emit('update:modelValue', selectedName)   // emit to parent if needed
    }
    

    watch(() => props.modelValue, (newVal) => {
      if (newVal !== searchInput.value) {
        searchInput.value = newVal
      }
    })

    return {
      searchTerm,
      searchResults,
      handlePlaceSelected, // ✅ expose the handler
    }
  }
})
