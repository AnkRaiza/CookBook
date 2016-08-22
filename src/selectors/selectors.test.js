import expect from 'expect';
import {categoriesFormattedForDropdown} from './selectors';

describe('Category Selectors', () => {
    describe('categoriesFormattedForDropdown', () => {
        it('should return category data formatted for use in a dropdown', () => {
            const categories = [
                { id: 'id1', name: 'Pastas' },
                { id: 'id2', name: 'Salads' }
            ];

            const expected = [
                { value: 'id1', text: 'Pastas' },
                { value: 'id2', text: 'Salads' }
            ];

            expect(categoriesFormattedForDropdown(categories)).toEqual(expected);
        });
    });
});