import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../store/store'
import { selectListState } from '../store/features/list/listSlice';
import { getListAction } from '../store/features/list/listActions';
import { ListNamesEnum } from '../store/features/list/listTypes';
import { TableHead } from '@mui/material';
import { TablePaginationActions } from '../component/Tables/TablePaginationComponent';
import Typography from '@mui/material/Typography';
import UseQueryHook from '../util/hook/UseQueryHook';
import TableLoadingSkeleton from '../component/Tables/TableLoadingSkeleton';
import InputField from '../component/UI/InputField/InputField';
import CustomButton from '../component/UI/Button/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

const BookList = () => {

    const [loaded, setLoaded] = useState(false);
    const tableHeaders = ['Title', 'Author(s)', 'Pages', 'City', 'Country', 'Year']
    const dispatch = useAppDispatch();
    const { books } = useAppSelector(selectListState);
    const { clearFilters, handlePageChange, handleRowNumberChange, handleSearch, query, search } = UseQueryHook({ defaultLimit: 10 })

    useEffect(() => {
        if (!loaded) return setLoaded(true);
        const { page, rowsPerPage, searchValue } = query;
        const payload = { itemsPerPage: rowsPerPage, page: page + 1, filters: [{ "type": "all", "values": [searchValue] }] }
        dispatch(getListAction({ endpoint: 'books', listName: ListNamesEnum.BOOKS, payload }))
    }, [query])

    if (!loaded) return <Stack alignItems='center' justifyContent='center' sx={{ height: '100vh', width: '100vw' }}><CircularProgress /></Stack>

    return (
        <Box style={{ padding: '0px 150px', overflow: 'hidden' }}>
            <Box sx={{ padding: '10px' }}>
                <Stack direction='row' alignItems='center'>
                    <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>Search Book: </Typography>
                    <InputField
                        style={{ width: '300px' }}
                        loading={search.loading}
                        showClearIcon={search?.value?.length > 0}
                        placeholder='Search book title...'
                        value={search?.value || ''}
                        onChange={(e) => handleSearch(e.target.value)}
                        onClearClick={clearFilters}
                    />
                </Stack>
                {search.error && <Typography sx={{ color: 'red', paddingLeft: '10px', fontSize: '14px' }}>{search.error}</Typography>}
            </Box>
            <TableContainer component={Paper} >
                <Table stickyHeader sx={{ minWidth: 500, maxHeight: '90vh' }}>
                    <TableHead >
                        <TableRow>
                            <TableCell sx={{ background: '#00C3A7', color: 'white' }} align='center' colSpan={3} >Book Detials</TableCell>
                            <TableCell sx={{ background: '#FF7045', color: 'white' }} align='center' colSpan={3} >Publication Details</TableCell>
                        </TableRow>
                        <TableRow >
                            {tableHeaders.map((header, index) =>
                                <TableCell sx={{ background: '#233244', color: 'white', minWidth: index === 0 ? '200px' : '100%' }} key={header} align="center">{header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    {books.isLoading ?
                        <TableLoadingSkeleton
                            numberOfCol={tableHeaders.length}
                            numberOfRow={query.rowsPerPage}
                        /> : <TableBody >
                            {(books.data.length > 0 ? books.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ width: '350px', }}>
                                        {row.book_title}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: '200px' }} align="center">
                                        {row.book_author.map((name, index) => <Typography key={name}>{index > 0 && ','} {name}.</Typography>)}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: '100px' }} align="center">
                                        {row.book_pages}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: '100px' }} align="center">
                                        {row.book_publication_city}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: '100px' }} align="center">
                                        {row.book_publication_country}
                                    </TableCell>
                                    <TableCell sx={{ minWidth: '100px' }} align="center">
                                        {row.book_publication_year}
                                    </TableCell>
                                </TableRow>
                            )) : <TableRow>
                                <TableCell align='center' colSpan={tableHeaders.length} >
                                    <Typography>No Data Found!</Typography>
                                    <CustomButton onClick={clearFilters} text='Reset Filters' />
                                </TableCell>
                            </TableRow>)}
                        </TableBody>}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
                                count={books.count}
                                rowsPerPage={query.rowsPerPage}
                                page={query.page}
                                onPageChange={(_, newPage) => handlePageChange(newPage)}
                                onRowsPerPageChange={(e) => handleRowNumberChange(+e.target.value)}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Box >
    );
}

export default BookList;