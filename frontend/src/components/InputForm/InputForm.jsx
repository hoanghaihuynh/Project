import React from 'react';
import { WrapperInputStyle } from './style';
const InputForm = (props) => {
    const { placeholder, ...rests } = props;
    const handleOnChangeInput = (e) => {
        props.handleOnChange(e.target.value);
    }
    return (
        <WrapperInputStyle 
            placeholder={placeholder} 
            value={props.value} 
            {...rests} 
            onChange={handleOnChangeInput} />
    );
}
export default InputForm;