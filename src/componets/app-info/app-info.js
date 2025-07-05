import './app-info.css';

const AppInfo = ({employees, employeesLike}) =>{
    return (
        <div className="app-info">
            <h1>Company employee accounting </h1>
            <h2>Total employees number: {employees}</h2>
            <h2>Number of employees who will receive a bonus: {employeesLike}</h2>
        </div>
    );
}

export default AppInfo;