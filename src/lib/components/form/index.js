import React from 'react';
import styled from 'styled-components';
import FormControl from '../form-control';
import { FormService } from '../../service';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...FormService.buildState(this.props.structure),
            ...props.state
        };
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
        const columns = Object.keys(structure.columns);
        const data = state[structure.name];
        return(
            <CollectionWrapper>
                {structure.label && <h2>{structure.label}</h2>}
                <Table>
                    {columns.length && 
                        <thead>
                            <tr>
                                <th width="1px">#</th>
                                {columns.map((column, key) => (
                                    <th key={key}>
                                        {structure.columns[column]}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    }
                    <tbody>
                        {data.map((row, key) => (
                            <tr key={key}>
                                <td>
                                    <button>edit</button>
                                </td>
                                {columns.map(column => (
                                    <td key={column}>
                                        {row[column]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td
                                style={{textAlign: 'center'}}
                                colspan={columns.length + 1}
                            >
                                <button>insert new</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CollectionWrapper>
        )
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
const CollectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0px 20px;

    > h2 {
        font-size: 18px;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
        padding: 0px 0px 10px;
        margin: 0px 0px 0px;
    }
`;
const Table = styled.table`
    border: 0px;
    width: 100%;
    text-align: left;
    border-collapse: collapse;

    thead th {
        border-bottom: 1px solid #dddddd;
        font-weight: 600;
        text-align: left;
        background: #eeeeee;
        padding: 15px 10px;
    }

    tbody {
        td {
            border-bottom: 1px solid #eeeeee;
            font-weight: 300;
            text-align: left;
            padding: 10px 10px;
        }
        tr:nth-child(even) td {
            background: #fafafa;
        }
    }
`

export default Form;
