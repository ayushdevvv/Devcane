export const validateResume = data => {

    if (!data.name?.trim())
        throw new Error("Name is required.");

    if (!data.education?.length)
        throw new Error("Education is required.");

    return true;

};