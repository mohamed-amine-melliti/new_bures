import { ref, computed } from 'vue';
import { usePlacesStore } from './usePlacesStore';

export function useSearchPlaces() {
  const searchInput = ref('');
  const searchResults = ref<any[]>([]);
  const searcherTimeout = ref<any>(null);

  const { searchPlacesByTerm } = usePlacesStore();

  const searchTerm = computed({
    get: () => searchInput.value,
    set: (val: string) => {
      searchInput.value = val;

      if (searcherTimeout.value) clearTimeout(searcherTimeout.value);
      searcherTimeout.value = setTimeout(async () => {
        const results = await searchPlacesByTerm(val);
        searchResults.value = results;
      }, 500);
    }
  });

  return {
    searchTerm,
    searchResults,
  };
}
