import React from 'react';
import ReactDOM from 'react-dom';
import { 
    FormBuilder as FB,
    FormComponent as Form
} from './lib';

const PosForm = FB.form(
    null,
    FB.group({
        fields: [
            { name: 'HeaderTitle', label: 'Título principal', type: 'text' },
            { name: 'HeaderSubTitle', label: 'Subtítulo', type: 'text' },
            { name: 'HeaderDescription', label: 'Descrição do header', type: 'text' },
        ]
    }),
    FB.collection({
        name: 'regulaments',
        columns: { label: 'Arquivo de regulamento' },
        form: [
            FB.group({
                orientation: 'vertical',
                fields: [
                    { name: 'regulament', label: 'Arquivo de regulamento', type: 'text' },
                    { name: 'label', label: 'Nome de exibição', type: 'text' }
                ]
            })
        ],
    }),
    FB.form(
        'payload',
        FB.group({
            fields: [
                { name: 'HeaderTitlePayload', label: 'Título principal', type: 'text' },
                { name: 'HeaderSubTitlePayload', label: 'Subtítulo', type: 'text' },
            ]
        }),
    )
);

ReactDOM.render(<div>
    <Form structure={PosForm} />
</div>, document.getElementById('root'));

// console.log(PosForm)
