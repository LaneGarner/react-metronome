import { useState } from 'react'


export const TimeSigSelect = ({ handleTimeChange }) => {
    const [timeSig, setTimeSig] = useState('4')

    return (
        <select onChange={handleTimeChange} name="selectTimeSig" id="selectTimeSig">
            <option value="4">4/4</option>
            <option value="3">3/4</option>
            <option value="5">5/4</option>
            <option value="7">7/4</option>
        </select>
    )
}