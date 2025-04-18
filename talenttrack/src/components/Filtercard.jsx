import { useEffect, useState } from "react"
import React from 'react'
import { useDispatch } from "react-redux";
import { setFilterQuery } from "../redux/jobSlice";

const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai","kolkata"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-10000", "30000", "30000-100000"]
    },{
        fitlerType: "Clear Filter",
        array:["All"]
    }
]

const Filtercard = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        //setSelectedValue((prev) => (prev === value ? "" : value));
        setSelectedValue(value);
    }
    useEffect(()=>{
        console.log(selectedValue);
        //dispatch(selectedValue);
        dispatch(setFilterQuery(selectedValue));
    },[selectedValue]);

    document.addEventListener("visibilitychange",()=>{
            console.log("document"+document);
            if (document.hidden){
                dispatch(setFilterQuery(''));
            }
        })

    return (
        <div>
            <h1>Filter JOB</h1>
            <div className="filter-container">
                {/* {filterData.map((filter, index) => (
                    <div key={index} className="filter-group">
                        <h3>{filter.fitlerType}</h3>
                        {filter.array.map((option, idx) => (
                            <label key={idx} className="radio-label">
                                <input
                                    type="radio"
                                    name={filter.fitlerType}
                                    value={option}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))} */}
                {
                filterData.map((data, index) => (
                    <div key={index}>
                        <h2>{data.filterType}</h2>
                        {
                            data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div key={itemId}>
                                        <input 
                                            type="radio" 
                                            id={itemId} 
                                            name={data.filterType} 
                                            value={item} 
                                            checked={selectedValue === item}
                                        onChange={() => changeHandler(item)}
                                            // checked={selectedValue === item} 
                                            // onChange={(e) => changeHandler(e.target.value)}
                                            // onChange={changeHandler} 
                                        />
                                        <label htmlFor={itemId}>{item}</label>
                                    </div>
                                );
                            })
                        }
                    </div>
                ))
            }
            </div>

        </div>
    )
}

export default Filtercard