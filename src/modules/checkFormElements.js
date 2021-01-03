const checkFormElements = form => {
    const filterForm = [...form.elements].filter(item => {
        if (item.matches('[type="tel"]')) {
            return /[\d+]{7,13}/.test(item.value);
        } else if (item.matches('[type="email"]')) {
            return /([a-z])|.+@.+\..+/i.test(item.value);
        } else {
            return item;
        }
    });

    if (filterForm.length === [...form.elements].length) {
        return true;
    } else {
        return false;
    }
};

export default checkFormElements;
