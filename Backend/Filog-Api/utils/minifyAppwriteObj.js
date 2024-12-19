module.exports = function(array) {
    return array.map(obj => {
        const processedObject = Object.fromEntries(
            Object.entries(obj).filter(([key]) => !key.startsWith('$'))
        );
        for (const key in processedObject) {
            if (Object.hasOwnProperty.call(processedObject, key)) {
                processedObject[key] = JSON.stringify(processedObject[key]);
            }
        }

        return processedObject;
    });
}