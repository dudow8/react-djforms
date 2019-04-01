let types = {};

export const addType = (type, FormControl) => {
    if(Array.isArray(type)) {
        type.forEach(item => {
            types[item] = FormControl
        });
    } else {
        types[type] = FormControl;
    }
};

export const getComponentByType = (type) => (
    types[type] || null
);
