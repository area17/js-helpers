export default queryStringHandler;
declare namespace queryStringHandler {
    /**
     * Convert a query string to an object
     *
     * @param {string} url - The string to convert.
     * @returns {object} - Returns the converted object.
    */
    function toObject(url: string): any;
    /**
     * Convert an object to a query string
     *
     * @param {Object} obj - The object to convert.
     * @returns {string} - Returns the converted string.
    */
    function fromObject(obj: any): string;
    /**
     * Update a query string parameter
     *
     * @param {string} url - The string to update
     * @param {string} key - The key to update, if the key doesn't exist, it gets added
     * @param {string} value - The new value to update, can handle ''
     * @returns {string} - Returns the updated string.
    */
    function updateParameter(url: string, key: string, value: string): string;
}
