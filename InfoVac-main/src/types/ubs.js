/**
 * @typedef {Object} UBSItem
 * @property {number} id
 * @property {string} name
 * @property {string} address
 * @property {number} distance
 * @property {'open' | 'closed'} status
 * @property {string} openingHours
 * @property {Object.<string, boolean>} vaccines
 */

/**
 * @typedef {Object} SearchFiltersProps
 * @property {string} searchQuery
 * @property {(value: string) => void} setSearchQuery
 * @property {string} filterVaccine
 * @property {(value: string) => void} setFilterVaccine
 * @property {string} filterCity
 * @property {(value: string) => void} setFilterCity
 * @property {() => void} handleSearch
 */

/**
 * @typedef {Object} ViewToggleProps
 * @property {'cards' | 'table'} viewMode
 * @property {(mode: 'cards' | 'table') => void} setViewMode
 * @property {number} resultsCount
 */

/**
 * @typedef {Object} ResultsProps
 * @property {UBSItem[]} searchResults
 * @property {string} filterVaccine
 */

export {}; 