# ⚙️ Flowise Installation Guide

**Complete setup instructions for macOS & Windows**

> 🚀 **Quick Start**: `npm install flowise && npx flowise start`

---

## 📑 Table of Contents

1. [System Requirements](#system-requirements)
2. [macOS Installation](#macos-installation)
3. [Windows Installation](#windows-installation)
4. [Troubleshooting & FAQs](#troubleshooting--faqs)
5. [Quick Reference](#quick-reference-commands)

---

## 📋 System Requirements

| Component | macOS | Windows |
|-----------|-------|---------|
| **Node.js** | v18.x or higher | v18.x or higher |
| **npm** | v8.x or higher | v8.x or higher |
| **RAM** | 4GB minimum (8GB recommended) | 4GB minimum (8GB recommended) |
| **Disk Space** | Minimum 2GB | Minimum 2GB |

### 📦 Core Dependencies

Flowise automatically installs these when you run `npm install`:

| Package | Purpose |
|---------|---------|
| **Express.js** | Web framework for API server |
| **LangChain** | LLM orchestration framework |
| **Langraph** | Graph-based LLM agent framework |
| **Turndown** | HTML to Markdown converter |
| **Axios** | HTTP client for API calls |
| **SQLite** | Database for storing flows and metadata |

---

## 🍎 Installation on macOS

### Step 1️⃣ Install Node.js and npm

#### Using Homebrew (Recommended)

**Install Homebrew** (if not already installed):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Install Node.js** (includes npm):

```bash
brew install node
```

**Verify installation**:

```bash
node --version
npm --version
```

---

### Step 2️⃣ Install Flowise

#### Local Installation (Recommended)

**Create and navigate to project directory**:

```bash
mkdir flowise-app
cd flowise-app
```

**Initialize npm project**:

```bash
npm init -y
```

**Install Flowise**:

```bash
npm install flowise
```

> ℹ️ **Note**: Local installation is recommended over global. This keeps dependencies isolated and makes updates easier.

---

### Step 3️⃣ Start Flowise

**Run Flowise**:

```bash
npx flowise start
```

✅ **Access Flowise at**: `http://localhost:3000`

You should see the Flowise UI with an empty dashboard. You're ready to create, test, and deploy flows!

---

### 🐳 Alternative: Using Docker

Perfect if you prefer containerized deployment.

1. **Install Docker Desktop for Mac**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)

2. **Run Flowise Docker image**:

```bash
docker run -d -p 3000:3000 --name flowise arafaths/flowise
```

3. **Access Flowise at**: `http://localhost:3000`

4. **Stop container**:

```bash
docker stop flowise
```

5. **Remove container**:

```bash
docker rm flowise
```

---

## 🪟 Installation on Windows

### Step 1️⃣ Install Node.js and npm

#### Direct Download Method

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the **LTS version** (latest stable)
3. Run the installer and follow the installation wizard
4. ✅ Check **"Automatically install necessary tools"** during installation
5. After installation, restart your computer

**Verify installation** - Open Command Prompt:

```cmd
node --version
npm --version
```

You should see version numbers (e.g., v18.17.0).

---

### Step 2️⃣ Install Flowise

#### Local Installation (Recommended)

**Open Command Prompt as Administrator** and navigate to where you want to install Flowise.

**Create and navigate to project directory**:

```cmd
mkdir C:\flowise-app
cd C:\flowise-app
```

**Initialize npm project**:

```cmd
npm init -y
```

**Install Flowise**:

```cmd
npm install flowise
```

> ⏱️ **Note**: First installation may take 5-10 minutes as all dependencies are downloaded.

---

### Step 3️⃣ Start Flowise

**Run Flowise**:

```cmd
npx flowise start
```

✅ **Access Flowise at**: `http://localhost:3000`

The browser should open automatically. If not, manually navigate to the URL above.

---

### 🐳 Alternative: Using Docker

Perfect for clean, isolated environments.

1. **Install Docker Desktop for Windows**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)
   - During installation, enable **WSL 2 backend**

2. **Open PowerShell** and run:

```powershell
docker run -d -p 3000:3000 --name flowise arafaths/flowise
```

3. **Access Flowise at**: `http://localhost:3000`

4. **Stop container**:

```powershell
docker stop flowise
```

5. **Remove container**:

```powershell
docker rm flowise
```

---

## 🔧 Troubleshooting & FAQs

### ❌ Issue: `MODULE_NOT_FOUND – turndown`

**Cause**: Missing dependency during installation

**Solution**:

```bash
# Step 1: Clear npm cache
npm cache clean --force

# Step 2: Remove node_modules and reinstall
rm -rf node_modules
npm install

# Step 3: Try starting again
npx flowise start
```

**On Windows**, use `rmdir node_modules /s /q` instead of `rm -rf node_modules`

---

### ❌ Issue: Port 3000 Already in Use

**Cause**: Another application is using port 3000

**Solution Option 1: Use a different port**

```bash
PORT=3001 npx flowise start
```

Then access at `http://localhost:3001`

**Solution Option 2: Kill the process on port 3000**

**Mac/Linux**:

```bash
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

**Windows (PowerShell as Admin)**:

```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Replace `<PID>` with the process ID from the first command.

---

### ❌ Issue: npm Install Fails

**Cause**: Network issues, npm cache corruption, or Node version mismatch

**Solution**:

```bash
# Step 1: Clear cache and reinstall with legacy peer deps
npm cache clean --force
npm install --legacy-peer-deps

# Step 2: If still failing, verify Node version
node --version
# Should be v18.0.0 or higher
```

---

### ❌ Issue: Connection Refused (`http://localhost:3000` not accessible)

**Cause**: Flowise service not running or slow to start

**Solution**:

- ⏱️ **Wait 15-30 seconds** for Flowise to fully initialize (especially first run)
- 📋 **Check terminal output** for any error messages
- 🔄 **Restart Flowise**: Press `Ctrl+C` and run `npx flowise start` again
- 🔌 **Verify port isn't in use** (see "Port 3000 Already in Use" above)
- 🔍 **Check firewall settings** - ensure port 3000 is accessible

---

### ❌ Issue: Permission Denied (npm install fails)

**Cause**: npm permissions issue (usually on macOS/Linux)

**Solution**:

```bash
# Fix npm permissions without using sudo
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Then try installation again
npm install flowise
```

---

### ❓ FAQ: Global vs Local Installation?

**Local Installation** (Recommended)
- ✅ Isolated dependencies
- ✅ Easier to manage multiple projects
- ✅ Simpler to update individual projects
- ✅ No global pollution
- Command: `npm install flowise`

**Global Installation**
- ✅ Access from anywhere
- ❌ Can cause version conflicts
- ❌ Harder to update selectively
- Command: `npm install -g flowise`

---

### ❓ FAQ: Can I update Flowise to the latest version?

Yes! Run:

```bash
npm install flowise@latest
```

To check your current version:

```bash
npm list flowise
```

---

### ❓ FAQ: How do I uninstall Flowise?

**Local installation**:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
```

**Global installation**:

```bash
npm uninstall -g flowise
```

---

### ❓ FAQ: Where are my flows stored?

By default, flows are stored in a local SQLite database:

- **macOS/Linux**: `~/.flowise/flowise.db`
- **Windows**: `C:\Users\<YourUsername>\.flowise\flowise.db`

You can export flows from the Flowise UI for backup.

---

## ⚡ Quick Reference Commands

| Task | Command |
|------|---------|
| **Start Flowise** | `npx flowise start` |
| **Reinstall dependencies** | `npm install` |
| **Clean npm cache** | `npm cache clean --force` |
| **Use custom port** | `PORT=3001 npx flowise start` |
| **Update Flowise** | `npm install flowise@latest` |
| **Check installed version** | `npm list flowise` |
| **Check Node version** | `node --version` |
| **Check npm version** | `npm --version` |

---

## 📚 Helpful Resources

- 📖 **[Official Flowise Documentation](https://docs.flowiseai.com/)**
- 💻 **[GitHub Repository](https://github.com/FlowiseAI/Flowise)**
- 💬 **[Discord Community](https://discord.gg/jbaHfsUqkG)**
- 📘 **[Node.js Documentation](https://nodejs.org/docs/)**
- 🐳 **[Docker Documentation](https://docs.docker.com/)**

---

## 🎯 Verification Checklist

After installation, verify everything is working:

- [ ] Node.js installed: `node --version` returns v18+
- [ ] npm installed: `npm --version` returns v8+
- [ ] Flowise installed: `npm list flowise` shows version
- [ ] Flowise starts: `npx flowise start` shows no errors
- [ ] UI accessible: `http://localhost:3000` loads successfully
- [ ] Can create a new flow in the UI
- [ ] No permission errors in terminal

---

## ✅ Installation Complete!

You're ready to build amazing LLM workflows with Flowise. Start at **`http://localhost:3000`**

### Next Steps:

1. 🎨 Create your first flow
2. 🔗 Connect LLM providers (OpenAI, Hugging Face, etc.)
3. 📚 Add data sources and knowledge bases
4. 🚀 Deploy your flows to production
5. 📖 Check the [documentation](https://docs.flowiseai.com/) for advanced features

---

**Document Version 2.0 – Last Updated January 2025**

For issues or questions, visit the [GitHub Issues](https://github.com/FlowiseAI/Flowise/issues) or [Discord Community](https://discord.gg/jbaHfsUqkG).
