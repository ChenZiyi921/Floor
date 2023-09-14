function getUrlKey(name) {
    const reg = (new RegExp(`[?|&]${name}=` + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(
        /\+/g,
        '%20'
    );
    return decodeURIComponent(reg) || null;
};

function jsonToParams(json) {
    return Object.keys(json)
        .map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
        })
        ?.join('&')
        ?.replaceAll('undefined', '');
};