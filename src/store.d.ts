/**
 * Store : A tiny state management library
 * @class Store
 * @param {object} params
 * @param {object} params.actions
 * @param {object} params.mutations
 * @param {object} params.initialState
 */
export default class Store {
    constructor(params: any);
    actions: {};
    mutations: {};
    state: any;
    status: string;
    callbacks: any[];
    /**
     * A dispatcher for actions that looks in the actions
     * collection and runs the action if it can find it
     *
     * @param {string} actionKey
     * @param {any} payload
     * @returns {boolean}
     * @memberof Store
     */
    dispatch(actionKey: string, payload: any): boolean;
    /**
     * Look for a mutation and modify the state object
     * if that mutation exists by calling it
     *
     * @param {string} mutationKey
     * @param {any} payload
     * @returns {boolean}
     * @memberof Store
     */
    commit(mutationKey: string, payload: any): boolean;
    /**
     * Fire off each callback that's run whenever the state changes
     * We pass in some data as the one and only parameter.
     * Returns a boolean depending if callbacks were found or not
     *
     * @param {object} data
     * @returns {boolean}
     */
    processCallbacks(data: object): boolean;
    /**
     * Allow an outside entity to subscribe to state changes with a valid callback.
     * Returns a function to later unsubscribe
     *
     * Subscribe :
     * const unsubscribe = store.subscribe(render)
     *
     * Unsubscribe :
     * unsubscribe();
     *
     * @param {function} callback
     * @returns {function}
     */
    subscribe(callback: Function): Function;
}
