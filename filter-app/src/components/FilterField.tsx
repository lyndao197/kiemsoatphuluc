import React from 'react';

interface FilterFieldProps {
    filterValue: string;
    onFilterChange: (value: string) => void;
}

const FilterField: React.FC<FilterFieldProps> = ({ filterValue, onFilterChange }) => {
    return (
        <input
            type="text"
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Filter..."
        />
    );
};

export default FilterField;