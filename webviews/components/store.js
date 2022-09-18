import { writable, derived } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const drinkNames = derived(apiData, ($apiData) => {
  if ($apiData.length > 0) {
    return $apiData.map(drink => {
        let imgSrc = drink?.data?.preview?.images?.[0]?.resolutions?.[3]?.url;
        if (imgSrc) imgSrc = imgSrc.replace(/&amp;/g, '&');
        return {
            title: imgSrc? drink.data.title: "",
            img: imgSrc,
            permalink: drink.data.permalink
        }
    }).filter(drink => drink.title !== "");
  }
  return [];
});