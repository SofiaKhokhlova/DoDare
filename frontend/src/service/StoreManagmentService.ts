import axios, { AxiosRequestConfig } from 'axios';
import FormDataNode from 'form-data';
import fs from 'fs';

const addItemToStore = (data: any, image: string) => {
    const formData = new FormDataNode();

    formData.append('data', JSON.stringify(data));

    formData.append('image', fs.createReadStream(image));

    const config: AxiosRequestConfig<FormDataNode> = {
        headers: {
            ...formData.getHeaders()
        }
    };

    return axios.post("http://localhost:8080/api/items/create", formData, config);
};