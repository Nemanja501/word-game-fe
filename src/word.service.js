import axios from "axios";

class WordService{
    static client = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/'
    });

    static async submitWord(word){
        const response = await this.client.request({
            method: 'POST',
            url: '/words',
            data: {
                word
            }
        });

        return response.data;
    }
}

export default WordService;