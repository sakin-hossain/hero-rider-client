import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import "./Admin.css";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;

    const { register, handleSubmit } = useForm();
    useEffect(()=>{
        fetch(`https://guarded-inlet-37110.herokuapp.com/users?page=${page}&&size=${size}`)
        .then(res => res.json())
        .then(data=> {
            setUsers(data.result);
            setDisplayProducts(data.result);
            const count = parseInt(data.count);
            const pageNumber = Math.ceil(count/size);
            setPageCount(pageNumber);
        });
    },[page]);

    const handleNameSearch = e => {
        const searchName = e.target.value;

        const matchedProducts = users.filter(user => user.name.toLowerCase().includes(searchName.toLowerCase()) || user.phone.toLowerCase().includes(searchName.toLowerCase()) || user.email.toLowerCase().includes(searchName.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }
    const handleCheckBox = (id) => {
        console.log(id);
    }
    const onSubmit = data => {
        console.log(data);
        if(parseInt(data.ageFrom) < 0){
            alert('please provide correct age');
            return;
        }
        const matchedAge = users.filter(user => parseInt(user.age) >= parseInt(data.ageFrom) && parseInt(user.age)<= parseInt(data.ageTo));
        setDisplayProducts(matchedAge);
    }
    return (
        <div className='admin-container'>
            <input type="text" placeholder='Search by Name, Email or Phone Number' onChange={handleNameSearch}/>
            <div className='filter'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="number" placeholder='Age From' {...register("ageFrom")} />
                    <input type="number" placeholder='Age To' {...register("ageTo")} />
                    <input type="submit" value="Search"/>
                </form>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Age</th>
                    <th>Vehicle</th>
                    <th>User Type</th>
                    </tr>
                </thead>
                {
                    displayProducts.map(user=> 
                    <tbody key={user._id}>
                        <tr>
                        <td>
                            <input onChange={()=>handleCheckBox(user.email)} type="checkbox"/>
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                        <td>{user.age}</td>
                        <td>{user.vehicleType}</td>
                        <td>{user.type}</td>
                        </tr>
                    </tbody>)
                }
            </Table>
            <div className="pagination">
                <span>Page to </span>
                <div>
                    {
                        [...Array(pageCount).keys()].map(number => 
                            <button
                            key={number}
                            onClick={()=>setPage(number)}
                            className={number === page ? 'btn selected': 'btn'}
                            >{number}</button>
                            )
                    }
                </div>
            </div>
        </div>
    );
};

export default Admin;