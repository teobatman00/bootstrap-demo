const GithubAPI = function(accessToken) {
    const api = 'https://api.github.com';
    function genAuthorizationHeader() {
        return `token ${accessToken}`
    }

    function authenticationOrigin(callback) {
        fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': genAuthorizationHeader(),
            }
        }).then(res => {
            if (res.status !== 200) {
                return res.json().then(jsonRes => {
                    callback(null);
                    throw new Error(jsonRes.message)
                })
            }
            return res.json();
        }).then(jsonRes => {
            callback(jsonRes);
        });
    }

    async function authentication() {
        const res = await fetch(api, {
            method: 'GET',
            headers: {
                'Authorization': genAuthorizationHeader(),
            }
        });
        const jsonRes = await res.json();
        if (res.status !== 200) {
            throw new Error(jsonRes.message);
        }
        return jsonRes;
    }

    async function requestUrl(url) {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': genAuthorizationHeader(),
            }
        });
        const jsonRes = await res.json();
        if (res.status !== 200) {
            throw new Error(jsonRes.message);
        }
        return jsonRes;
    }

    this.authentication = authentication;
    this.requestUrl = requestUrl;
};