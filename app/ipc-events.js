const ipcEvents: Array = [
  {
    name: 'ACTION.set_chrome_path',
    // action: Puppeteer._setChromePath,
    onError: console.error
  },
  {
    name: 'ACTION.validate_transaction',
    // action: validateTransaction,
    onError: console.error
  }
];

export default ipcEvents;
