export const form = ({name, ...form}) => ({
    collection: false,
    form,
    ...name && name
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
