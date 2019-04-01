import React from 'react';
import styled from 'styled-components';
import { FormControlService as FC } from '../../service';

FC.addType('select', ({options = [], ...props}) => (
    <Dropdown
        {...props}
    >
        <option disabled={true} value={''}>...</option>
        {options.map((item, key) => (
            <option
                value={item.value}
                key={key}>
                {item.label}
            </option>
        ))}
    </Dropdown>
));

FC.addType(['text', 'password', 'date', 'time'], ({field: {type}, ...props}) => (
    <>
        {['text', 'password', 'date', 'time'].includes(type) &&
            <TextInput
                {...type === 'date' && {pattern: '[0-9]{2}/[0-9]{2}/[0-9]{4}'}}
                {...type === 'time' && {step: 1}}
                {...props}
            />
        }
    </>
));

FC.addType('long-text', (props) => (
    <LongTextInput
        rows="3"
        {...props}
    />
));

const FormControl = ({handleChange, label, field, value, error, ...props}) => {
    const Input = FC.getComponentByType(field.type);
    return (
        <Wrapper>
            <Label>
                {label}
            </Label>
            {Input && <Input
                onChange={handleChange}
                name={field.name}
                type={field.type}
                value={value}
                field={field}
                {...props}
            />}
            {error && <ErrorMessage>
                {error}
            </ErrorMessage>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 5px;
    padding-bottom: 10px;
    width: 100%;
`;
const Label = styled.label`
    color: #333333;
    display: block;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -.2px;
    line-height: 1.5;
`;
const TextInput = styled.input`
    border: 1px solid #dddddd;
    display: block;
    font-size: 14px;
    height: 35px;
    padding: 0px 10px;
    width: 100%;
    box-sizing: border-box;
`;
const LongTextInput = styled.textarea`
    border: 1px solid #dddddd;
    display: block;
    font-size: 14px;
    padding: 10px 10px;
    width: 100%;
    box-sizing: border-box;
`;
const Dropdown = styled.select`
    background: white;
    border: 1px solid #dddddd;
    display: block;
    font-size: 14px;
    height: 35px;
    padding: 0px 10px;
    width: 100%;
    box-sizing: border-box;
`;
const ErrorMessage = styled.p`
    color: darkred;
    font-size: 12px;
    margin: 0;
    padding: 2px 0px;
`;

export default FormControl;
