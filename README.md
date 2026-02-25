# ShowMeTheKey OBS Overlay

A lightweight, customizable, and blazing-fast OBS Browser Source overlay for displaying keystrokes and mouse clicks. 

Built specifically for Linux/Wayland users, this tool acts as a WebSocket bridge between the native [`showmethekey-cli`](https://github.com/AlynxZhou/showmethekey) utility and a beautifully animated HTML overlay using [Bun](https://bun.sh/) and Tailwind CSS.

## ✨ Features
* **Wayland Ready:** Reliably captures global inputs on Wayland using `showmethekey-cli` (via `libinput`).
* **Ultra Lightweight:** No massive Electron apps or heavy Node.js binaries. It runs on the incredibly fast Bun runtime and uses a pure HTML/CSS/JS frontend.
* **Zero Network Dependency:** All Tailwind CSS styles are pre-compiled and bundled locally.
* **Smart Combos:** Automatically groups modifier keys (e.g., `Ctrl + Shift + T` or `Ctrl + L🖱️`).
* **Customizable:** Easily tweak animations, colors, and layout by modifying the HTML/CSS.

## 📦 Prerequisites

Before using this overlay, ensure you have the following installed on your system:
* `showmethekey` (The core input capture utility)
* `bun` (The JavaScript runtime)

## 🚀 Installation

### Arch Linux (AUR)
If you are using Arch Linux, you can install the package directly using your favorite AUR helper (e.g., `yay` or `paru`). This will automatically pull the required dependencies and place the files in the correct system directories.

```bash
yay -S smtk-obs-overlay-git

```

### Manual Installation

Clone the repository and run it directly:

```bash
git clone [https://github.com/denizkose/smtk-obs.git](https://github.com/denizkose/smtk-obs.git)
cd smtk-obs
chmod +x smtk-obs-server

```

## 🎮 Usage

### 1. Start the Background Server

Run the startup script in your terminal.
*Note: Because `showmethekey-cli` reads input devices directly via `libinput` on Wayland, it requires `sudo` privileges. The script will prompt you for your password.*

**If installed via AUR:**

```bash
smtk-obs-server

```

**If installed manually:**

```bash
./smtk-obs-server

```

You should see a message indicating that the WebSocket server is running on `ws://localhost:8080`.

### 2. Add to OBS Studio

1. Open OBS Studio.
2. Under the **Sources** panel, click the `+` icon and select **Browser**.
3. Name it (e.g., "Key Overlay") and click OK.
4. Check the box for **Local file**.
5. Click **Browse** and select the `overlay.html` file.
* *If installed via AUR, this file is located at:* `/usr/share/smtk-obs/overlay.html`
* *If installed manually, select the file inside your cloned folder.*


6. Set **Width** to `1920` and **Height** to `1080` (or match your canvas resolution). The overlay uses flexbox to automatically align the keys to the bottom right corner.
7. Check **Refresh browser when scene becomes active** (this helps reconnect the WebSocket if the server is restarted).
8. Clear the **Custom CSS** field (our styles are already bundled).
9. Click **OK**.

Click your mouse or type on your keyboard, and you should see the beautiful animated pop-ups appear in your OBS preview!

## 🎨 Customization (For manual installs)

If you want to change colors, animations, or layout, you can edit the `overlay.html` and `input.css` files.

If you modify the Tailwind classes in the HTML, you will need to recompile the `output.css` file. Run this command in the project root:

```bash
bun run build:css

```

*(Requires `@tailwindcss/cli` to be installed via `bun install`)*