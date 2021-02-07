import {BrowserWindow, Menu} from 'electron';

export default class Main
{
    /**
     * Main window of the application.
     */
    static mainWindow: Electron.BrowserWindow | null

    /**
     * The kernel of application.
     */
    static app: Electron.App

    /**
     * Main Menu.
     */
    static menu: Electron.Menu

    /**
     * Template used to create the Menu.
     */
    static menuTemplate: Array<object> = [
        {
            label: 'Quit'
        }
    ]

    /**
     * Path of the main view of the app.
     */
    static mainViewPath: string = __dirname + '/index.html'

    /**
     * Turn off the application on Linux/Windows OS.
     * on MacOS, the convention want to keep the application running in background even if the window is closed.
     */
    private static onWindowAllClosed(): void
    {
        if (process.platform !== "darwin") {
            Main.app.quit()
        }
    }

    /**
     * Delete reference of the window to be sure to reload it from scratch at every launch.
     */
    private static onClose(): void
    {
        Main.mainWindow = null
    }

    /**
     * Setup the application when the kernel is ready.
     */
    private static onReady(): void
    {
        Main.mainWindow = new BrowserWindow()
        Main.createMenuFromTemplate()
        Menu.setApplicationMenu(Main.menu)
        Main.mainWindow
            .loadURL('file://' + Main.mainViewPath)
        Main.mainWindow.on('closed', Main.onClose)
    }

    /**
     * Build the Menu from a template array.
     */
    private static createMenuFromTemplate(): void
    {
        Main.menu = Menu.buildFromTemplate(Main.menuTemplate)
    }

    /**
     * Run the App
     * @param Electron.App app
     */
    static run(app: Electron.App): void
    {
        Main.app = app
        Main.app.on('window-all-closed', Main.onWindowAllClosed)
        Main.app.on('ready', Main.onReady)
    }
}