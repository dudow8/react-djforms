import React from 'react';
import styled from 'styled-components';
import * as deepmerge from 'deepmerge';
import FormControl from '../form-control';
import Modal from '../modal';
import { FormService } from '../../service';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = deepmerge(
            FormService.buildState(this.props.structure),
            props.state
        )
    }

    submit() {
        const { onSubmit } = this.props;
        onSubmit && onSubmit(this.state);
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
        const data = state[structure.name];
        return(
            <FormCollectionComponent
                structure={structure}
                data={data}
                handleChange={collection => {
                    props.handleChange({
                        target: {
                            name: structure.name,
                            type: 'collection',
                            value: collection
                        }
                    })
                }}
            />
        )
    }

    if(!structure.form) {
        return(
            <InputGroupWrapper delimited={structure.delimited}>
                {structure.label && <h2>{structure.label}</h2>}
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
            </InputGroupWrapper>
        )
    }
}

class FormCollectionComponent extends React.Component {
    state = {
        showModal: false,
        formData: {},
        indexEditing: -1
    }

    render() {
        const { structure, data, handleChange } = this.props;
        const { showModal, formData, indexEditing } = this.state;
        const columns = Object.keys(structure.columns);
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
                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.setState({
                                                showModal: true,
                                                indexEditing: key,
                                                formData: row
                                            });
                                        }}
                                    >
                                        edit
                                    </button>
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
                                colSpan={columns.length + 1}
                            >
                                <button
                                    type="button"
                                    onClick={() => {
                                        this.setState({
                                            showModal: true
                                        })
                                    }}
                                >
                                    add new
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {showModal && <Modal
                    windowTitle={structure.label && structure.label}
                    windowActions={[
                        { label: "save", onClick: () => this.formRef.submit() },
                        indexEditing !== -1 && {
                            label: "remove",
                            onClick: () => {
                                handleChange([ ...data.slice(0, indexEditing), ...data.slice(indexEditing + 1) ]);
                                this.setState({
                                    showModal: false,
                                    indexEditing: -1,
                                    formData: {}
                                });
                            }
                        }
                    ]}
                    onClose={() => {
                        this.setState({
                            showModal: false
                        })
                    }}>
                    <CollectionModalWrapper>
                        <Form
                            ref={ref => this.formRef = ref}
                            structure={{ collection: false, form: structure.form }}
                            state={formData}
                            onSubmit={(form) => {
                                if(indexEditing !== -1) {
                                    handleChange([ ...data.slice(0, indexEditing), form, ...data.slice(indexEditing + 1) ]);
                                } else {
                                    handleChange([ ...data, ...[form] ]);
                                }
                                this.setState({
                                    showModal: false,
                                    indexEditing: -1,
                                    formData: {}
                                });
                            }}
                        />
                    </CollectionModalWrapper>
                </Modal>}
            </CollectionWrapper>
        )
    }
}

const FormWrapper = styled.div`
    width: 100%;
`;
const InputGroupWrapper = styled.div`
    border-top: ${props => props.delimited ? '1px solid #cccccc' : '0px'};
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: ${props => props.delimited ? '10px 0px' : '0px'};;
    padding-top: ${props => props.delimited ? '10px' : '0px'};
    
    > h2 {
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
        padding: 0px 0px 10px;
        margin: 15px 0px;
    }
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
        font-size: 20px;
        font-weight: 600;
        border-bottom: 1px solid #ddd;
        padding: 0px 0px 10px;
        margin: 0px 0px 15px;
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
const CollectionModalWrapper = styled.div`
    padding: 20px 15px;
`

export default Form;
