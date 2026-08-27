import React, { useState } from 'react';
import FilterField from './components/FilterField';

const App: React.FC = () => {
    const [filterValue, setFilterValue] = useState('');

    const handleFilterChange = (value: string) => {
        setFilterValue(value);
    };

    return (
        <div>
            <h1>Filter App</h1>
            <FilterField value={filterValue} onChange={handleFilterChange} />
        </div>
    );
};

export default App;