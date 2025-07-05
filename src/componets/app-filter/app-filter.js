import React from 'react';
import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        { name: 'all', label: 'All employees' },
        { name: 'like', label: 'Employees for promotion' },
        { name: 'moreThan1000', label: 'Salary >$1000' }
    ];

    const buttons = buttonsData.map(({ name, label }) => {
        const isActive = props.filter === name;
        const btnClass = isActive ? 'btn btn-light' : 'btn btn-outline-light';

        return (
            <button
                key={name}
                className={btnClass}
                type="button"
                data-filter={name}
                onClick={() => props.onFilterSelect(name)}
            >
                {label}
            </button>
        );
    });

    return (
        <div className="btn-group">
            {buttons}
        </div>
    );
};

export default AppFilter;
