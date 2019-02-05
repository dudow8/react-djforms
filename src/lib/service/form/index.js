export const form = (name, ...form) => ({
    collection: false,
    form,
    ...name && {name}
});

export const collection = ({
    columns = {},
    name,
    ...form,
}) => ({
    collection: true,
    columns,
    name,
    ...form ? form : []
});

export const group = ({
    delimited = false,
    fields = [],
    label = null,
    orientation = 'vertical'
}) => ({
    collection: false,
    delimited,
    fields,
    label,
    orientation
});

export const buildState = (structure, state = {}) => {
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
    return state;
};
