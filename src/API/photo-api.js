import axios from "axios";

const APIphoto = async (query, page) => {
        const response = await axios.get('/search/photos/', {
            baseURL: 'https://api.unsplash.com',
            params: {
                page: page,
                query: query,
                client_id: 'XKBhK0RiIvtEQPZ6BXJqgq73dbZVuTj_3Ld-LCi61R8'
            }
        });
        return response.data.results;
}
export {APIphoto}