import React from 'react';
import styled from 'styled-components';
import FormControl from '../form-control';
import { FormService } from '../../service';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = FormService.buildState(this.props.structure);
    }

    render() {
        return (
            <FormWrapper>
                <FormComponent
                    structure={this.props.structure}
                    state={this.state}
                    formChange={
                        (state) => {
                            this.setState(state);
                            console.log('FormComponent CHANGE', state)
                        }
                    }
                />
            </FormWrapper>
        )
    }
}

const handleChange = ({target}, state = {}) => {
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    return {
        ...state,
        [name]: value
    };
}

const FormComponent = (props) => {
    const { structure, state, formChange } = props;
    if(!structure.collection && structure.form) {
        return (
            <>
                {structure.form.map((form, key) => {
                    const FormState = structure.name ? state[structure.name] : state;
                    return <FormComponent
                        key={key}
                        structure={form}
                        state={FormState}
                        formChange={(form) => {
                            formChange({
                                ...state,
                                ...structure.name
                                    ? { [structure.name]: form } 
                                    : form
                            });
                        }}
                        handleChange={(event) => {
                            formChange({
                                ...state,
                                ...structure.name
                                    ? {[structure.name]: handleChange(event, FormState)}
                                    : handleChange(event, FormState)
                            });
                        }}
                    />;
                })}
            </>
        );
    }

    if(structure.collection) {
        return <div>Collection Table {structure.name + ' ' + JSON.stringify(state[structure.name])}</div>;
    //     return { ...state, [structure.name]: [] };
    }

    if(!structure.form) {
        return(
            <FormInputGroup orientation={structure.orientation || 'vertical'}>
                {structure.fields.map((item, key) => (
                    <FormControl
                        key={key}
                        handleChange={props.handleChange}
                        field={item}
                        value={state[item.name]}
                        // error={errors[item.name]}
                        label={item.label}
                        options={item.options}
                    />
                ))}
            </FormInputGroup>
        )
    }
}


const FormWrapper = styled.form`
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
