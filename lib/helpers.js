export const sizedImage = (imgSrc, size) => {
    return imgSrc.replace(/(\.[^\.]+)$/, `_${size}$1`);
};

export function convertStringToCents(value, separator = '.') {
    const cleanRegex = new RegExp(`[^\\d\\${separator}]`, 'g');
    const cleanValue = value.replace(cleanRegex, '');
    const floatValue =
        separator === '.'
            ? parseFloat(cleanValue).toFixed(2)
            : parseFloat(cleanValue.replace(separator, '.')).toFixed(2);

    if (isNaN(floatValue)) {
        throw new Error('Not a valid numerical string');
    }

    return floatValue * 100;
}

export function formatMoney(cents, format) {
    if (typeof cents == 'string') {
        cents = cents.replace('.', '');
    }

    const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

    function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
        if (isNaN(number) || number == null) {
            return 0;
        }

        let floatNumber = (number / 100.0).toFixed(precision);

        const parts = floatNumber.split('.');
        const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        const cents = parts[1] ? decimal + parts[1] : '';

        return dollars + cents;
    }

    let value = '';

    switch (format.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
        case 'amount_with_apostrophe_separator':
            value = formatWithDelimiters(cents, 2, "'", '.');
    }

    return format.replace(placeholderRegex, value);
}
