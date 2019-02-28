import React from 'react';
import ReactDOM from 'react-dom';
import { 
    FormBuilder as FB,
    DJForm
} from './lib';

// Build the form structure following the project needs
const formStructure = FB.form(
    null,
    FB.group({
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
                { name: 'title', label: 'Dependencies Description', type: 'text' }
            ]
        }),
        FB.collection({
            name: 'files',
            label: 'Files',
            columns: { label: 'Display Name', file: 'File' },
            form: [
                FB.group({
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