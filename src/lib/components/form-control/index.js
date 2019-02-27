import React from 'react';
import styled from 'styled-components';

const FormControl = ({handleChange, label, field, value, options = [], error}) => (
    <Wrapper>
        <Label>
            {label}
        </Label>
        {['text', 'password', 'date', 'time'].includes(field.type) &&
            <TextInput
                onChange={handleChange}
                name={field.name}
                type={field.type}
                value={value}
                {...field.type === 'date' && {
                    pattern: '[0-9]{2}/[0-9]{2}/[0-9]{4}'
                }}
                {...field.type === 'time' && {
                    step: 1
                }}
            />
        }
        {['long-text'].includes(field.type) &&
            <LongTextInput
                onChange={handleChange}
                name={field.name}
                type={field.type}
                value={value}
                rows="3"
            />
        }
        {['select'].includes(field.type) &&
            <Dropdown
                onChange={handleChange}
                name={field.name}
                type={field.type}
                value={value}
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
        }

        {error && <ErrorMessage>
            {error}
        </ErrorMessage>}
    </Wrapper>
);

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
