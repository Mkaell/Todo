class ApiService {
    constructor(baseUrl){
        this.url = baseUrl;
    }

    async createPost(post){
        try{
            const request = new Request(`${this.url}/posts.json`, {
                method: 'POST',
                body: JSON.stringify(post),
            });
            return useRequest(request);
        } catch (error){
            console.log(error);
        }
    }

    async fetchPost(){
        try{
            const request = new Request(`${this.url}/posts.json`, {
                method: 'GET',
            });
            return useRequest(request);
        } catch (error){
            console.log(error);
        }
    }

    async fetchPostById(id){
        try{
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'GET',
            });
            return useRequest(request);
        } catch (error){
            console.log(error);
        }
    }
}

async function useRequest(request){
    const response = await fetch(request)
                    .then((response) => response.json());
    return response;
}

export const apiService = new ApiService(
    'https://project-todo-700c6-default-rtdb.europe-west1.firebasedatabase.app/'
);