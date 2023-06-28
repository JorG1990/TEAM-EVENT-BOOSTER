import { API_URL, API_KEY } from './config';

export async function fetchEventsName(searhInput) {
    const queryParams = new URLSearchParams({
        keyword: searhInput,
        apikey: API_KEY,
        //   locale: '*',
        //   includeImages: 'yes',
    });

    try {
        const response = await fetch(`https://${API_URL}?${queryParams}`);
        const data = await response.json();
        render = data;
        console.log(render);
    } catch (error) {
        console.log(error);
   }
}
