// const md5 = require('md5');
// const getGravatarHash = (email) => md5(email.toLowerCase().trim());
// const getGravatarSrc = (email, size) => `https://www.gravatar.com/avatar/${getGravatarHash(email)}s=${size}`;

const uppercaseFirst = (input) => {
    if (!input) return '';
    return `${input[0].toUpperCase()}${input.slice(1)}`;
};
const lowercaseFirst = (input) => {
    if (!input) return '';
    return `${input[0].toLowerCase()}${input.slice(1)}`;
};

const toSentenceCase = (string) => {
    let newString = string.replace(/(^\s*\w|[.!?]\s*\w)/g,function(c){return c.toUpperCase()});
    return newString;
}

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function validateEmail(mail)  {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    }
    return (false);
}

export {
    // getGravatarHash,
    // getGravatarSrc,
    uppercaseFirst,
    lowercaseFirst,
    shuffleArray,
    toSentenceCase,
    validateEmail,
}
