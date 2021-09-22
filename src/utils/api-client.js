const apiURL = process.env.REACT_APP_API_URL;
// const apiURL = 'http://localhost:8080';

async function client(
    endpoint,
    { data, token, headers: customHeaders, ...customConfig } = {},
) {
    let defaultHeaders = {};
    if (token) defaultHeaders = { Authorization: `Bearer ${token}` };
    if (data)
        defaultHeaders = {
            ...defaultHeaders,
            'Content-Type': 'application/json',
        };
    const config = {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            ...defaultHeaders,
            ...customHeaders,
        },
        ...customConfig,
    };

    return window
        .fetch(`${apiURL}/${endpoint}`, config)
        .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data.error);
            }
        });
}

export { client };
