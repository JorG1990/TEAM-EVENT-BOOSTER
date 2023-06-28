import { API_URL, API_KEY } from './config';
import { pageSize } from './renderPagination';
import { currentPage } from './renderPagination';
import { formatEvents } from '..';
import { renderEvents } from './renderEvents';
export async function fetchEventsName(searhInput) {
    const queryParams = new URLSearchParams({
        keyword: searhInput,
        apikey: API_KEY,
        locale: '*',
        includeImages: 'yes',
        size: pageSize,
        // page: pageNumber,
    });

    try {
        const response = await fetch(`https://${API_URL}?${queryParams}`);
        const data = await response.json();
        console.log(data)
        const events = formatEvents(data._embedded.events); // Formatear los eventos
        const totalPages = Math.ceil(data.page.totalElements / pageSize);
        renderEvents(events);
        // renderPagination(totalPages, currentPage)
    } catch (error) {
        console.log(error);
    }
}