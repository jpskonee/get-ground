import listReducer, { clearListState, getListFailure, getListRequest, getListSuccess, initialState } from './listSlice';
import { ListNamesEnum } from './listTypes';

describe('listSlice ReducerS', () => {
    it('should clear book state', () => {
        const nextState = listReducer({ ...initialState, books: { ...initialState.books, count: 50 } }, clearListState(ListNamesEnum.BOOKS));
        expect(nextState.books.count).toBe(0);
    });

    it('should set book state loading to true', () => {
        const nextState = listReducer(initialState, getListRequest(ListNamesEnum.BOOKS));
        expect(nextState.books.isLoading).toBe(true);
    });

    it('should update book state data upon success', () => {
        const nextState = listReducer(initialState, getListSuccess({ listName: ListNamesEnum.BOOKS, data: { count: 400, message: 'Operation Successful!' } }));
        expect(nextState.books.count).toBe(400);
        expect(nextState.books.message).toBe('Operation Successful!');
    });

    it('should update book state data upon failure', () => {
        const nextState = listReducer(initialState, getListFailure({ listName: ListNamesEnum.BOOKS, error: 'An Error Occured' }));
        expect(nextState.books.error).toBe('An Error Occured');
    });

});
