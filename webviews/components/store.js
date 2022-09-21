import { writable, derived } from 'svelte/store';


export const apiData = writable([]);


export const posts = derived(apiData, ($apiData) => {
  if ($apiData.length > 0) {
    return $apiData.map(drink => {
        let imgSrc = drink?.data?.preview?.images?.[0]?.resolutions?.[3]?.url;
        // eslint-disable-next-line curly
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