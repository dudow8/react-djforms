import React from 'react';
import styled from 'styled-components';
import FormControl from '../form-control';

const Form = ({ fields, data = {}, errors = {}, handleChange }) => (
    <Wrapper>
        {fields.map((fieldGroup, key) => (
            <FormInputGroup
                key={key}
                orientation={fieldGroup.orientation || 'vertical'}
            >
                {fieldGroup.fields.map((item, fieldKey) => (
                    <FormControl
                        key={fieldKey}
                        handleChange={handleChange}
                        field={item}
                        value={
                            data.payload
                                ? mandatoryFields.includes(item.name) ? data[item.name] : data.payload[item.name]
                                : data[item.name]
                        }
                        error={errors[item.name]}
                        label={item.label}
                        options={item.options}
                    />
                ))}
            </FormInputGroup>
        ))}
    </Wrapper>
);

const Wrapper = styled.form`
    width: 100%;
`;
const FormInputGroup = styled.div`
    display: flex;
    flex-direction: ${props => (
        props.orientation === 'vertical'
            ? 'column'
            : 'row'
    )};
    justify-content: space-between;
    margin: 0px -5px;
    width: 100%;
`;

export default Form;
