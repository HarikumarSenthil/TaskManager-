export const setCookie = (name: string, value: string, daysToLive = 1): void => {
    if (document) {
        // Encode value in order to escape semicolons, commas, and whitespace
        let cookie = `${name}=${encodeURIComponent(value)}`;

        if (typeof daysToLive === 'number') {
            /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
            cookie += `; max-age=${daysToLive * 24 * 60 * 60}; path=/`;

            document.cookie = cookie;
        }
    }
};

export const getCookie = (name: string, externalCookies?: string): any => {
    const cookie = typeof document !== 'undefined' ? document.cookie : externalCookies;
    if (cookie) {
        // Split cookie string and get all individual name=value pairs in an array
        const cookieArr = cookie.split(';');

        // Loop through the array elements
        for (let i = 0; i < cookieArr.length; i += 1) {
            const cookiePair = cookieArr[i].split('=');

            /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
            if (name === cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
    }

    // Return null if not found
    return null;
};

export const removeCookie = (name: string): any => {
    document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
};
