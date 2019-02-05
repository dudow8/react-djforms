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
        const { structure, state = {}, errors = {}, handleChange } = this.props;
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

const FormBuilder = () => (
    (props) => {
        if(!structure.collection && structure.form) {
            const form = structure.form.reduce((form, item) => ({
                ...buildState(item, form) 
            }), {});
            return structure.name ? { ...state, [structure.name]: form } : form;
        }
    
        if(structure.collection) {
            return { ...state, [structure.name]: [] };
        }
    
        if(!structure.form) {
            const form = structure.fields.reduce(
                (form, item) => ({
                    ...form,
                    [item.name]: ''
                })
            , {});
            return { ...state, ...form };
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
