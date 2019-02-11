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
        label: 'Regulamentos',
        columns: { label: 'Arquivo de regulamento', 'regulament': 'Arquivo' },
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
            orientation: 'horizontal',
            fields: [
                { name: 'HeaderTitlePayload', label: 'Título principal', type: 'text' },
                { name: 'HeaderSubTitlePayload', label: 'Subtítulo', type: 'text' },
            ]
        }),
        FB.form(
            'payloadIntern',
            FB.group({
                orientation: 'horizontal',
                fields: [
                    { name: 'HeaderTitlePayload2', label: 'Título principal 2', type: 'text' },
                    { name: 'HeaderSubTitlePayload2', label: 'Subtítulo 2', type: 'text' },
                ]
            }),
            FB.form(
                'payloadInternIntern',
                FB.group({
                    orientation: 'horizontal',
                    fields: [
                        { name: 'HeaderTitlePayload3', label: 'Título principal 3', type: 'text' },
                        { name: 'HeaderSubTitlePayload3', label: 'Subtítulo 3', type: 'text' },
                    ]
                })
            )
        )
    )
);

ReactDOM.render(<div>
    <Form structure={PosForm} />
</div>, document.getElementById('root'));

console.log('PosForm', PosForm)
