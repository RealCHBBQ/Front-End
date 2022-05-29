export function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return new Promise((resolve, reject) => {
        return reject(response);
      });
    }
}



export function json(response) {

    return response.json();  // note this returns a promise
}

