import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Chennai", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer", "Nextjs Developer"]
    },
    {
        filterType: "Salary",
        array: ["0 - 5 Lakhs", "5 - 10 Lakhs", "10 - 20 Lakhs", "20+ Lakhs"]
    },
];

const FilterCard = ({ onFilterChange }) => {
    const [selectedValue, setSelectedValue] = useState('');
    
    const handleChange = (value) => {
        setSelectedValue(value);
    };
    
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange(selectedValue);
        }
    }, [selectedValue, onFilterChange])

    return (
        <div className='w-full bg-white p-2 sm:p-3 rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-base sm:text-lg'>Filter Jobs</h1>
            </div>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={handleChange}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className='font-medium text-base sm:text-lg'>{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `r${index}-${idx}`; // Ensure unique id for each radio button
                            return (
                                <div key={idx} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId} className="text-xs sm:text-sm">{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
