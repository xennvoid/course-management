import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const useDebounceSearch = () => {

    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleChange, 500);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    return [searchValue, debouncedResults];
}

export default useDebounceSearch;