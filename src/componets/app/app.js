
import {Component} from 'react'

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";


import './app.css';
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Art M.', salary: 800, increase: true, like: false, id: 1},
                {name: 'Ira H.', salary: 2000, increase: false, like: true, id: 2},
                {name: 'Nig A.', salary: 1500, increase: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all',
        }
    }
    deleteItem = (id) =>{
        this.setState(({data})=>{
            return {
                data: data.filter(item => item.id !== id),
            }
        });
    }
    addItem = (name, salary) =>{
        const maxId = this.state.data.length > 0 ? Math.max(...this.state.data.map(item => item.id))+1 : 0;

        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: maxId + 1,
        }
        this.setState(({data})=>({
            data: [...data, newItem]
        }));
    }
    onSalaryChange = (id, newSalary) =>{
        this.setState(({data})=>({
            data:data.map(item => item.id === id ? { ...item, salary: parseFloat(newSalary) || 0 } : item)
        }));
    }

    onToggleProp = (id, prop) =>{
        this.setState(({data})=>({
            data: data.map(item => {
                if(item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));

    }
    searchEmp = (items, term) =>{
        if(term === 0){
            return items;
        }
        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })

    }
    onUpdateSearch = (term) =>{
        this.setState({term});
    }
    filterEmployees = (items, filter) =>{
        switch(filter) {
            case 'like': // для підвищення (increase == true)
                return items.filter(item => item.like);
            case 'moreThan1000': // зарплата > 1000
                return items.filter(item => item.salary > 1000);
            default: // всі співробітники
                return items;
        }
    }
    onFilterSelect = (filter) =>{
        this.setState({filter});
    }

    render(){
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const employeesLike = this.state.data.filter(item=>item.increase).length;
        const visibleData = this.filterEmployees(this.searchEmp(data, term), filter);


        return (
            <div className="app">
                <AppInfo
                    employees={employees} employeesLike={employeesLike}
                />


                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                    />
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.onSalaryChange}
                />
                <EmployeesAddForm
                    onAdd={this.addItem}
                />
            </div>
        );
    }
}


export default App;
