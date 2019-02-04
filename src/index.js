import React from 'react';
import ReactDOM from 'react-dom';
import { FormBuilder as FB } from './lib';

ReactDOM.render(<div />, document.getElementById('root'));

const PosForm = FB.form(
    FB.group({
        fields: [
            { name: 'HeaderTitle', label: 'Título principal', type: 'text' },
            { name: 'HeaderSubTitle', label: 'Subtítulo', type: 'text' },
            { name: 'HeaderDescription', label: 'Descrição do header', type: 'text' }
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
    })
);

console.log(PosForm)
