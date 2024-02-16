export default listeners;
declare namespace listeners {
    function add(nodes: any, type: any, func: any, options?: boolean): string;
    function remove(nodes: any, type: any, func: any, options?: boolean): string;
}
