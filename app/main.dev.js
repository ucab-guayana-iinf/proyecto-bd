/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 *
 */
import { app, BrowserWindow } from 'electron';
import signale from 'signale';
// import db from '../db/lib/index';
import setupDatabase from '../db/lib/setupDatabase';
import MenuBuilder from './menu';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  // await db.connect((err) => {
  //   if (err) {
  //     const error = new Error('Error connecting to database');
  //     signale.error(error);
  //   } else {
  //     signale.success('Connection to DB stablished')
  //   }
  // });
  await setupDatabase(true);

  if (
    process.env.DEV_DB !== 1 && (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true')
  ) {
    await installExtensions();
  }

  if (!process.env.DEV_DB) {
    mainWindow = new BrowserWindow({
      show: false,
      width: 1280,
      height: 1040,
      minWidth: 1024,
      minHeight: 728,
      webPreferences: {
        nodeIntegration: true
      }
    });

    mainWindow.on('closed', () => {
      mainWindow = null;
    });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
      if (!mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }

    });

    mainWindow.webContents.on('did-fail-load', () => {
      console.log('did-fail-load');
      mainWindow.loadURL(`file://${__dirname}/app.html`);
      // REDIRECT TO FIRST WEBPAGE AGAIN
    });
  }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  db.end();
  signale.log('closed the database connection');

  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
