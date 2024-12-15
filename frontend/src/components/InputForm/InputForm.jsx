import React from 'react';
import { WrapperInputStyle } from './style';
const InputForm = (props) => {
    const { placeholder, ...rests } = props;
    const handleOnChangeInput = (e) => {
        props.handleOnChange(e.target.value);
    }
    return (
        <WrapperInputStyle 
            className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder={placeholder} 
            value={props.value} 
            {...rests} 
            onChange={handleOnChangeInput} />
    );
}
export default InputForm;