folder "dist" - build of full client part
folder "www" - app for ssr

ssr do not support css module, use

const canUseDOM = !!(
    (typeof window !== 'undefined' &&
        window.document && window.document.createElement)
);

const style = canUseDOM ? require('./style.scss') : {};



