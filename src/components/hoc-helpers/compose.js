const compose = (...funcs) => (comp) => {
    return (
        funcs.reduceRight((prevResult, f) => {
            return f(prevResult);
        }, comp)
    );
};

export default compose;
