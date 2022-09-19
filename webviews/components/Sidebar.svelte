<script>
    import { onMount } from "svelte";
    import { apiData, drinkNames } from './store.js';
    
    onMount(async () => {
      fetch("https://www.reddit.com/r/ProgrammerHumor.json?limit=50")
      .then(response => response.json())
      .then(data => {
            console.log(data?.data);
            //suffle the data
            let shuffledData = data?.data.children.sort(() => 0.5 - Math.random());
        apiData.set(shuffledData);
      }).catch(error => {
        console.log(error);
        return [];
      });
    });
</script>
    
<main>

    {#each $drinkNames as drinkName}
        <div>
            <br/>
            <br/>
            <h2>{drinkName.title}</h2>
            <img src={drinkName.img}  alt=''/>
            <button
                on:click={() => {
                    //  copy permalink of drinkName to clipboard
                    const copy = drinkName.img;
                    navigator.clipboard.writeText(copy);
                    tsvscode.postMessage({
                        type: 'onInfo',
                        value: `copied meme's link to clipboard!`
                    })
                }}
            >
                Share this meme
            </button>
        </div>
    {/each}
    <br/>
    <p>Made by <a href='https://github.com/buikhacnam' target="_blank">Casey Bui</a> with ❤️</p>
    <br/>

</main>
    
<style>

</style>