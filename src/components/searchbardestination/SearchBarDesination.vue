<script lang="ts" src="./SearchBarDestination.ts" />

<template>
  <div>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="searchTerm"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <SearchResults />
  </div>
</template>

