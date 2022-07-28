
// wallet

// IM Token
const isIMTokenAvailable = () => {
    if (typeof window.ethereum === 'undefined') {
        return false;
    }
    return (typeof window.ethereum.isImToken !== 'undefined')
}

const openInIMTokenExplorer = () => {
    const urlScheme = 'imtokenv2://navigate/DappView?url=' + window.location.href
    const downloadUrl = 'https://token.im/download'
    if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if(timeOutDateTime - loadDateTime < 5000) {
                window.location.href = downloadUrl;
            } else {
                window.close();
            }
        },250);
        window.location = urlScheme;
    } else if(navigator.userAgent.match(/android/i)) {
        const loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if(timeOutDateTime - loadDateTime < 5000) {
                window.location.href = downloadUrl;
            } else {
                window.close();
            }
        },250);
        window.location.href = urlScheme
    }
}

// Token Pocket
const isTokenPocketAvailable = () => {
    if (typeof window.ethereum === 'undefined') {
        return false;
    }
    return (typeof window.ethereum.isTokenPocket !== 'undefined')
}
const openInTokenPocketExplorer = () => {
    const params = encodeURIComponent(JSON.stringify({
        "url": window.location.href
    }))
    const urlScheme = 'tpdapp://open?params=' + params
    const downloadUrl = 'https://www.tokenpocket.pro/zh/download/app'
    if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        var loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if(timeOutDateTime - loadDateTime < 5000) {
                window.location.href = downloadUrl;
            } else {
                window.close();
            }
        },250);
        window.location = urlScheme;
    } else if(navigator.userAgent.match(/android/i)) {
        const loadDateTime = new Date();
        window.setTimeout(function() {
            var timeOutDateTime = new Date();
            if(timeOutDateTime - loadDateTime < 5000) {
                window.location.href = downloadUrl;
            } else {
                window.close();
            }
        },250);
        window.location.href = urlScheme
    }
}

// meta mask


export {
    isIMTokenAvailable,
    isTokenPocketAvailable,
    openInIMTokenExplorer,
    openInTokenPocketExplorer
}