<!-- <script lang='ts'>
	import { onMount } from 'svelte'


    let todos: Array<{text: string, completed: boolean}> = []
    let text = ''

    onMount(async () => {
        window.addEventListener('message', event => {
            const message = event.data
            console.log(message)
            switch (message.type) {
                case 'new-todo':
                    todos = [{text: message.value, completed: false}, ...todos]
                    break
            }
        })
    })
</script>

<style>
    .completed {
        text-decoration: line-through;
    }
</style>

<form
    on:submit|preventDefault={e => {
        todos = [{text, completed: false}, ...todos]
        text = ''
    }}
>
<input bind:value={text}/>
</form>


<ul>
    {#each todos as todo (todo.text)} 
        <li 
            class:completed={todo.completed}
            on:click={() => {
                todo.completed = !todo.completed
            }}
        >{todo.text}</li>
    {/each}
</ul> -->




<!-- -------------------------------------------------------------------------------------------------------- -->
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
    <h1>Programmer Humor</h1>
    <span>Made by <a href='https://github.com/buikhacnam' target="_blank">Casey Bui</a> with ❤️</span>

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


</main>
    
<style>

</style>