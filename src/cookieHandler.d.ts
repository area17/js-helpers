export default cookieHandler;
declare namespace cookieHandler {
    export function create(name: any, value: any, days: any): void;
    function _delete(name: any): void;
    export { _delete as delete };
    export function read(name: any): string;
}
