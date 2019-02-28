# react-djforms
DJForms is a simple way for building forms to your react app using a flexible structure.

## Installation
````console
$ npm i react-djforms
````

## Configuration
After adding react-djforms to your project you just need to import using ES6 modules and start using.
Here is a small example to show how simple is building forms using the DJForms:
````jsx
// Import the lib to your project
import {  FormBuilder as FB, DJForm } from 'react-djforms';

// Build the form structure following the project needs
const formStructure = FB.form(
    null,
    FB.group({
        fields: [
            { name: 'Title', label: 'Header Title', type: 'text' },
            { name: 'Description', label: 'Header Description', type: 'text' },
        ]
    })
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
````
## Documentation
You gonna need to manage only two dependencies to work with DJForms: the `FormBuilder` and the `DJForm`.
The `FormBuilder` is the tool you gonna use to help building the form structure and the `DJForm` the component who will render the form using the before builded structure.

### FormBuilder
FormBuilder has tree helper methods to build the form structure: `form`, `collection` and `group`.

#### FormBuilder.form(key, ...structure)
The `form` method is the root form element. The key parameter will create a key in the state object and if `key === null`, the form will be atached at the state object root.
````jsx
// The following strucutre ...
const structure = FormBuilder.form(
    null,
    FormBuilder.group({
        fields: [{ name: 'origin', label: 'Origin:', type: 'text' }]
    }),
    FormBuilder.form(
        'user',
        FormBuilder.group({
            fields: [{ name: 'name', label: 'Name:', type: 'text' }]
        }),
        FormBuilder.form(
            'contact',
            FormBuilder.group({
                fields: [{ name: 'email', label: 'Email:', type: 'text' }]
            })
        )
    ),
    FormBuilder.collection({
        name: 'files',
        label: 'Files',
        columns: { label: 'Display Name', file: 'File' },
        form: [
            FormBuilder.group({
                orientation: 'vertical',
                fields: [
                    { name: 'label', label: 'Display Name', type: 'text' },
                    { name: 'file', label: 'File', type: 'text' }
                ]
            })
        ],
    })
);

// ... will generate the following state:
{
    origin: '',
    user: {
        name: '',
        contact: {
            email: '',
            phone: ''
        }
    }
}
````

#### FormBuilder.group({ delimited = false, fields = [], label = null, orientation = 'vertical'})
The `group` method will create a container to our fields. There's some rendering options: the `orientation` can be vertical or horizontal. this will be the axis used to render our group on the screen. The `label` is an optional parameter and will create a visual above the input group, for visual organization purpose. The `delimited` will crate a visual delimitation line before the current input group, to create a better visual organization, as necessary. The most important option is the `fields`. It's an array of objects that gonna describe the inputs we need to create.
````js
/// The field object should look like this
{
    name: string,
    label: string,
    type: string,
    options?: [{
        value: string,
        label: string 
    }]
}
````
The `name` key is the same key that gonna be used later, at the form state object. `label` is the label to inform the user the input purpose and `type` is the field type: `['text', 'password', 'date', 'time', 'long-text', 'select']`. `option` is an array of objects and it's required only when `type === 'select'` and should have the `{ value: string, label: string }` structure, where `value` is the option value and `label` is the option label.

#### FormBuilder.collection({columns = {}, name, label = null, ...form})
The `collection` method will create a data table and it's stored as a object's array in the state object. Each row is a representation of the `form` key, where should be represented by a form structure. `name` is the key where gonna be stored the data in the state object. `label` is the optional table label. `columns` is an object where the key is the field name of the collection form and the key value is the column header label of the displaying table. Only the columns described in this object will be displayed on the table.


---
`This documentation is still under construction/revision. Suggestions are appreciated.`