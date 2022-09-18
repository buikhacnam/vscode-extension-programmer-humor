<script>
    import { onMount } from "svelte";
    import { apiData, drinkNames } from './store.js';
    
    onMount(async () => {
      fetch("https://www.reddit.com/r/ProgrammerHumor.json")
      .then(response => response.json())
      .then(data => {
            console.log(data?.data);
        apiData.set(data?.data);
      }).catch(error => {
        console.log(error);
        return [];
      });
    });
    </script>
    
    <main>
        <h1>Programmer Humor</h1>
        <span>Made by <a href='https://github.com/buikhacnam' target="_blank">Casey Bui</a> with ❤️ </span>
        {#each $drinkNames as drinkName}
            <div>
                <br/>
                <br/>
                <h2>{drinkName.title}</h2>
                <img src={drinkName.img}  alt=''/>
            </div>
        {/each}
    </main>
    
    <style>
    
    </style>