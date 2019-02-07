import React from 'react';
import styled from 'styled-components';
import FormControl from '../form-control';
import { FormService } from '../../service';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = FormService.buildState(this.props.structure);
        this.FormComponent = FormBuilder(this.props);
    }

    render() {
        const FormComponent = this.FormComponent;
        return (<FormComponent />)
        // return (
        //     <>
        //         {structure.colection
        //             ? <></>
        //             : <Wrapper>
        //                 {structure.fields.map((fieldGroup, key) => (
        //                     <FormInputGroup
        //                         key={key}
        //                         orientation={fieldGroup.orientation || 'vertical'}
        //                     >
        //                         {fieldGroup.fields.map((item, fieldKey) => (
        //                             <FormControl
        //                                 key={fieldKey}
        //                                 handleChange={handleChange}
        //                                 field={item}
        //                                 value={state[item.name]}
        //                                 error={errors[item.name]}
        //                                 label={item.label}
        //                                 options={item.options}
        //                             />
        //                         ))}
        //                     </FormInputGroup>
        //                 ))}
        //             </Wrapper>
        //         }
        //     </>
        // )
    }
}

const FormBuilder = (formStructure) => (
    (props) => {
        const { structure, state = {}, errors = {}, handleChange } = formStructure;
        if(!structure.collection && structure.form) {
            const FormComponent = <>
                {structure.form.map((form, key) => {
                    const Component = FormBuilder({ ...formStructure, structure: form });
                    return <Component key={key} />;
                })}
            </>;
            return FormComponent;
        }
    
        if(structure.collection) {
            return <div>Collection {structure.name}</div>;
        //     return { ...state, [structure.name]: [] };
        }
    
        if(!structure.form) {
            return(
                <Wrapper>
                    <FormInputGroup orientation={structure.orientation || 'vertical'}>
                        {structure.fields.map((item, key) => (
                            <FormControl
                                key={key}
                                handleChange={handleChange}
                                field={item}
                                value={state[item.name]}
                                error={errors[item.name]}
                                label={item.label}
                                options={item.options}
                            />
                        ))}
                    </FormInputGroup>
                </Wrapper>
            )
        }
    }
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
