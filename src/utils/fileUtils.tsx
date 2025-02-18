const getBytes = (unit: string): number => {
    let bytes = -1;
    switch (unit) {
        case 'MB':
            bytes = 1024 * 1024;
            break;
        case 'KB':
            bytes = 1024;
            break;
        default:
            bytes = -1;
    }
    return bytes;
};

export default { getBytes };
