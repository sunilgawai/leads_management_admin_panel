/* eslint-disable prettier/prettier */
import axios from "axios";

class ApiService {
    static apiServer = axios.create({
        baseURL: "http://localhost:4000",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        withCredentials: true
    });

    static login = ({ email, phone, password }) => {
        return new Promise((resolve, reject) => {
            this.apiServer.post('/api/auth/login', {
                email,
                phone,
                password
            }).then((response) => {
                return resolve(response);
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    static logout = ({ refreshToken }) => {
        return new Promise((resolve, reject) => {
            this.apiServer.post('/api/auth/logout', {
                refreshToken
            }).then((response) => {
                return resolve(response);
            }).catch((error) => {
                return reject(error);
            })
        })
    }

    static getCart = () => {
        return new Promise((resolve, reject) => {
            this.apiServer.get('/api/cart').then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }

    static setCart = (table) => {
        return new Promise((resolve, reject) => {
            this.apiServer.post('/api/cart', {
                table
            }).then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }

    static deleteFromCart = (id) => {
        return new Promise((resolve, reject) => {
            this.apiServer.delete(`/api/cart/item/${id}`).then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }

    static getProducts = () => {
        return new Promise((resolve, reject) => {
            this.apiServer.get('/api/products').then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }

    static getCategories = () => {
        return new Promise((resolve, reject) => {
            this.apiServer.get('/api/categories').then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }

    static getOrders = () => {
        return new Promise((resolve, reject) => {
            this.apiServer.get('/api/order').then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }

    static viewOrder = (id) => {
        return new Promise((resolve, reject) => {
            this.apiServer.get(`/api/order/${id} `).then((response) => {
                return resolve(response);
            }).catch((err) => {
                return reject(err)
            })
        })
    }
}

export default ApiService;