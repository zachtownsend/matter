export const sizedImage = (imgSrc, size) => {
    console.log(imgSrc.replace(/(\.[^\.]+)$/, `_${size}$1`));
    return imgSrc.replace(/(\.[^\.]+)$/, `_${size}$1`);
};
