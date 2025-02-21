import '@testing-library/jest-dom'
if (typeof structuredClone !== 'function') {
    global.structuredClone = obj => JSON.parse(JSON.stringify(obj));
  }