<script>
    import { onMount } from "svelte";
    import { apiData, posts } from './store.js';
    let loading = true;
    
    onMount(async () => {
      fetch("https://www.reddit.com/r/ProgrammerHumor.json?limit=50")
      .then(response => response.json())
      .then(data => {
            loading = false;
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

        {#if loading}
                <div class="sidebar__loading">
                    <h3>Loading...</h3>
                </div>
            {:else}
                <div>
                </div>
            {/if}
    {#each $posts as post}
        <div>
            <br/>
            <br/>
            <h2>{post.title}</h2>
            <img src={post.img}  alt=''/>
            <button
                on:click={() => {
                    //  copy permalink of post to clipboard
                    const copy = post.img;
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
    <span>New Memes should be updated every several hours...</span>
    <p>Made by <a href='https://github.com/buikhacnam' target="_blank">Casey Bui</a> with ❤️</p>
    <br/>

</main>
    
<style>

</style>