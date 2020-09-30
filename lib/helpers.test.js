import { convertStringToCents, formatMoney, sizedImage } from './helpers';

describe('Generate sized image path', () => {
    it('created sized image path for a given path', () => {
        expect(
            sizedImage(
                'https://cdn.shopify.com/s/files/1/0479/0858/5627/products/man-adjusts-blue-tuxedo-bowtie_925x_252131d1-c953-4b25-8ea5-1520e6a3d368.jpg?v=1599422652',
                '1024x1024@2x'
            )
        ).toBe(
            'https://cdn.shopify.com/s/files/1/0479/0858/5627/products/man-adjusts-blue-tuxedo-bowtie_925x_252131d1-c953-4b25-8ea5-1520e6a3d368_1024x1024@2x.jpg?v=1599422652'
        );
    });
});

describe('Convert money string string to cents', () => {
    it('Converts a string with a 1DP to a valid integer', () => {
        expect(convertStringToCents('50.0')).toBe(5000);
        expect(convertStringToCents('50.3')).toBe(5030);
    });

    it('converts a string with 2DP to a valid integer', () => {
        expect(convertStringToCents('10500.3')).toBe(1050030);
    });

    it('converts a string with more than 2DP to a valid integer', () => {
        expect(convertStringToCents('12.345')).toBeCloseTo(1235);
        expect(convertStringToCents('50.55.123')).toBe(5055);
    });

    it('converts when a non-decimal string is passed', () => {
        expect(convertStringToCents('55')).toBe(5500);
    });

    it('ignores magnitude separators', () => {
        expect(convertStringToCents('55,000.35')).toBe(5500035);
    });

    it('can use a comma as a separator', () => {
        expect(convertStringToCents('50,0', ',')).toBe(5000);
        expect(convertStringToCents('50,3', ',')).toBe(5030);
        expect(convertStringToCents('10500,3', ',')).toBe(1050030);
        expect(convertStringToCents('12,345', ',')).toBeCloseTo(1235);
        expect(convertStringToCents('55')).toBe(5500);
    });

    it('throws an error if not a numerical string', () => {
        expect(() => convertStringToCents('Toast')).toThrow('Not a valid numerical string');
    });
});

describe('Format value into price string', () => {
    it('returns price with "." separator', () => {
        expect(formatMoney(150050, '€{{amount}}')).toBe('€1,500.50');
    });

    it('returns amount with no cents', () => {
        expect(formatMoney(150050, '€{{amount_no_decimals}}')).toBe('€1,501');
    });

    it('returns price with "," separator', () => {
        expect(formatMoney(150050, '€{{amount_with_comma_separator}}')).toBe('€1.500,50');
    });

    it('returns price with "," separator', () => {
        expect(formatMoney(150050, '€{{amount_no_decimals_with_comma_separator}}')).toBe('€1.501');
    });

    it('returns price with "\'" thousands separator', () => {
        expect(formatMoney(150050, '€{{amount_with_apostrophe_separator}}')).toBe("€1'500.50");
    });
});
