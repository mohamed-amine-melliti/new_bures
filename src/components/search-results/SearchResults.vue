<script lang="ts" src="./SearchResults.ts" />

<template>
  <ul v-if="places.length > 0" class="list-group mt-3">
    <li v-for="place in places" :key="place.id" class="list-group-item list-group-item-action"
      :class="{ 'active': place.id === activePlace }">
      <h5>{{ place.text }}</h5>
      <p>{{ place.place_name }}</p>
      <div align="right">
        <button class="btn btn-outline-primary btn-sm" :class="{ 'btn-outline-light': place.id === activePlace }"
          @click.stop="onChoisirClicked(place)">
          Choisir
        </button>

      </div>
    </li>
  </ul>
</template>


<style scoped>
li {
  cursor: pointer;
}

h5 {
  font-size: 16px;
  font-weight: bold;
}

p {
  font-size: 12px;
}
</style>
