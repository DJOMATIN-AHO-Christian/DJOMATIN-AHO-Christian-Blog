export const grpahCMSImageLoader = ({ src, width, quality }) => {
    if (src.includes('media.graphassets.com')) {
        const splitUrl = src.split('/');
        const handle = splitUrl[splitUrl.length - 1];
        return `https://media.graphassets.com/resize=width:${width},quality:${quality || 75}/${handle}`;
    }
    return src;
};
