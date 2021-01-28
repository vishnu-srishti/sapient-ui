
export class Utility {

    static baseUrl = `https://api.spaceXdata.com/v3/`;

    static apiUrls = {
        launches: { url: `${Utility.baseUrl}launches`, type: 'GET' },
    };

    // static setLocalStorage = (name, data) => {
    //     localStorage.setItem(name, btoa(JSON.stringify(data)));
    // }

    // static getLocalStorage = (name) => {
    //     return localStorage.getItem(name);
    // }

    // static clearLocalStorage(): void {
    //     localStorage.clear();
    // }
}
