import { debounce } from 'lodash';
import { useState, useEffect, useMemo } from 'react';
import { RegrexPattern, validationCases } from '../constant/RegrexCases';
import { useLocation, useNavigate } from 'react-router-dom';

export interface QueryProps {
    page: number;
    rowsPerPage: number;
    searchValue: string
}

const defaultQuery: QueryProps = {
    page: 0,
    rowsPerPage: 10,
    searchValue: ''
}

interface InitialProp {
    defaultLimit: number,
    defualtPage?: number,
    searchPatterns?: RegrexPattern[]
    defaultSearchValue?: string
}

enum URLTagNames {
    PAGE = 'page',
    LIMIT = 'limit'
}
const UseQueryHook = (initialQuery: InitialProp) => {


    const { minLength, noSpecialCharacters } = validationCases;

    const { defualtPage = 0, defaultLimit = 10, defaultSearchValue = '', searchPatterns = [minLength(3), noSpecialCharacters] } = initialQuery
    const [query, setQuery] = useState<QueryProps>({ ...defaultQuery, searchValue: defaultSearchValue });
    const [search, setSearch] = useState({ loading: false, value: defaultSearchValue, error: '' });

    const location = useLocation();
    const navigate = useNavigate();
    const urlQueryObj = new URLSearchParams(location.search);
    const urlQuery = Object.fromEntries(urlQueryObj.entries());

    const updateQueryUrl = (cases: { value: number, name: URLTagNames }[]) => {
        cases.map((c) => urlQueryObj.set(c.name, (c.value).toString()))
        navigate({ search: urlQueryObj.toString() });
    }

    const handleRowNumberChange = (rowsPerPage: number) => {
        updateQueryUrl([{ name: URLTagNames.PAGE, value: 1 }, { name: URLTagNames.LIMIT, value: rowsPerPage }])
        setQuery({ ...query, page: 0, rowsPerPage });
    };

    const handlePageChange = (page: number) => {
        updateQueryUrl([{ name: URLTagNames.PAGE, value: page + 1 }])
        setQuery({ ...query, page });
    };

    const updateSearchQuery = (value: string) => {
        setSearch((preValues) => ({ ...preValues, loading: false, value }));
        setQuery({ ...query, searchValue: value, page: 0 });
        updateQueryUrl([{ name: URLTagNames.PAGE, value: 1 }])
    };

    const debouncedChangeHandler = useMemo(() => debounce(updateSearchQuery, 1500), []);

    const handleSearch = (value: string) => {
        setSearch({ value, loading: true, error: '' });
        if (!value) return clearFilters();
        let newErorr = '';
        if (searchPatterns && searchPatterns?.length > 0 && value?.length > 0) {
            searchPatterns?.forEach((pattern) => {
                if (!pattern?.pattern?.test(value)) {
                    newErorr = pattern.errorMessage;
                }
            });
        }
        setSearch((preValues) => ({ ...preValues, error: newErorr }));
        if (newErorr !== '') return;
        debouncedChangeHandler(value);
    };

    const clearFilters = () => {
        setSearch({ error: '', loading: false, value: '' })
        setQuery(defaultQuery);
        updateQueryUrl([
            { name: URLTagNames.PAGE, value: 1 },
            { name: URLTagNames.LIMIT, value: defaultLimit }
        ])
    };

    useEffect(() => {
        setSearch({ ...search, value: defaultSearchValue })
        setQuery({ page: (+urlQuery[URLTagNames.PAGE] - 1) || 0, rowsPerPage: +urlQuery[URLTagNames.LIMIT] || defaultLimit, searchValue: defaultSearchValue })
        updateQueryUrl([
            { name: URLTagNames.PAGE, value: +urlQuery[URLTagNames.PAGE] || 1 },
            { name: URLTagNames.LIMIT, value: +urlQuery[URLTagNames.LIMIT] || defaultLimit }
        ])
    }, [])

    return { query, handleRowNumberChange, clearFilters, handlePageChange, handleSearch, search };
}

export default UseQueryHook;