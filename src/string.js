export const isOnlyASCIIString = str => !/[^\x20-\x7E]/gm.test(str)

/*
* normalize function should have a good support now
* otherwise polyfill is available here: https://nicedoc.io/walling/unorm
* */
const removeAccents = (str) => str.normalize('NFD').replace(/\p{Diacritic}/ugm, '')

const removeNonASCIICharacters = str => str.replace(/\P{ASCII}/ugm, '')

const cleanASCIIString = (str) => removeNonASCIICharacters(removeAccents(str))


export { isOnlyASCIIString, removeAccents, removeNonASCIICharacters, cleanASCIIString };
