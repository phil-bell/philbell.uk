import Cookies from "js-cookie";

export class Fetcher{
    constructor(){
        this.headers = {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          }
    }

    async call(type, url, body){
        return await fetch(url, {
            method: type,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken"),
            },
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            document
                .querySelector("toast-card")
                .show("An error has occured");
            console.error('Error:', error);
        })
    }

    get(...args){
        return this.call("GET", ...args)
    }

    post(...args){
        return this.call("POST", ...args)
    }

}