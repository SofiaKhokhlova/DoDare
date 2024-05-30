import axios, { AxiosRequestConfig } from 'axios';


export const addItemToStore = (data: any, image: string) => {
    const formData = new FormData();

    formData.append('image', new Blob([image], {type: "text/plain"}), image);
    formData.append('data', JSON.stringify(data));

    const config: AxiosRequestConfig<FormData> = {
        headers: {
            /*'Content-Type': 'multipart/form-data',*/
        }
    };

    return axios.post("http://localhost:8080/api/items/create", formData, config);
};