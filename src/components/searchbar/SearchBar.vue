<script lang="ts" src="./SearchBar.ts" />

<template>
  <div
    class="fixed top-6 left-4 w-[95vw] max-w-xl max-h-[90vh]  rounded-xl z-50 p-4 flex flex-col overflow-hidden"
  >
    <!-- Scrollable content -->
    <div
      class="overflow-y-auto h-full space-y-4 pr-2 hide-scrollbar"
    >
      <SearchForm />

      <input
        type="text"
        placeholder="Recherchez un lieu et choisissez la destination !"
        v-model="searchTerm"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <SearchResults />
    </div>
  </div>
</template>

<style scoped>
/* Completely hide scrollbar */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>
