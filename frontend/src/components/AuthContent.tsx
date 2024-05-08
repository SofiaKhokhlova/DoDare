import * as React from 'react';
import axios from 'axios';

export const request = ({method, url, data}: { method: any, url: any, data: any }) => {
    return axios({
        method: method,
        url: url,
        data: data
    })
}

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.headers.post["Content-Type"] = "application/json";

export default class AuthContent extends React.Component {

    constructor(props: {}) {
        super(props);
        this.state = {
            data: ""
        };
    };

    componentDidMount() {
        request(
            {method: "GET", url: "/api/authtest", data: {}}
        ).then((response) => {
            this.setState({data : response.data})
        });
    };

    render() {
        return (
            <div>
                {this.state.data}
            </div>
        )
    }
}