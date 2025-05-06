import { ref, computed } from 'vue';
import { usePlacesStore } from './usePlacesStore';
export function useSearchPlaces() {
    const searchInput = ref('');
    const searchResults = ref([]);
    const searcherTimeout = ref(null);
    const { searchPlacesByTerm } = usePlacesStore();
    const searchTerm = computed({
        get: () => searchInput.value,
        set: (val) => {
            searchInput.value = val;
            if (searcherTimeout.value)
                clearTimeout(searcherTimeout.value);
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
//# sourceMappingURL=useSearchPlaces.js.map