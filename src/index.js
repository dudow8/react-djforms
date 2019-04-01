import React from 'react';
import ReactDOM from 'react-dom';
import {
    addType,
    FormBuilder as FB,
    DJForm
} from './lib';

// Crate a custom libtype
addType('custom', (props) => (
    <input
        placeholder={props.field.placeholder}
        {...props}
    />
));

// Build the form structure following the project needs
const formStructure = FB.form(
    null,
    FB.group({
        label: 'Label Test',
        fields: [
            { name: 'title', label: 'Header Title', type: 'text' },
            { name: 'description', label: 'Header Description', type: 'text' },
            { 
                name: 'tag',
                label: 'Tag',
                type: 'select', 
                options: [
                    { value: 'h1', label: 'h1' },
                    { value: 'h2', label: 'h2' },
                    { value: 'h3', label: 'h3' }
                ]
            }
        ]
    }),
    FB.form(
        'dependencies',
        FB.group({
            fields: [
                { name: 'title', label: 'Dependencies Description', type: 'text' },
                { name: 'custom', label: 'Custom FormControl', type: 'custom', placeholder: 'Custom FormControl Placeholder' }
            ]
        }),
        FB.collection({
            name: 'files',
            label: 'Files',
            columns: { label: 'Display Name', file: 'File' },
            form: [
                FB.group({
                    label: 'Regulamento',
                    fields: [
                        { name: 'label', label: 'Display Name', type: 'text' },
                        { name: 'file', label: 'File', type: 'text' }
                    ]
                })
            ],
        })
    ),
);
// Create your component using DJForm
export class ExampleForm extends React.Component {
    render() {
        const {state = {}, onSubmit} = this.props;
        return (<>
            <button type="button" onClick={() => this.formRef.submit()}>
                Submit
            </button>
            <DJForm
                ref={ref => this.formRef = ref}
                structure={formStructure}
                state={state}
                onSubmit={onSubmit}
            />
        </>)
    }
} 

ReactDOM.render(<div>
    <ExampleForm 
        onSubmit={form => console.log(form)}
        state={{
            title: 'Teste',
            dependencies: {
                title: 'Default'
            }
        }}
    />
</div>, document.getElementById('root'));

console.log(formStructure)