import os
import subprocess
import sys
import time
import webbrowser


def run_app():
    print("🚀 Starting Farmer's Direct Deployment Process...\n")

    # 1. Check if Node.js is installed
    try:
        subprocess.run(
            ["node", "-v"], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
    except Exception:
        print(
            "❌ Error: Node.js is not installed. Please install Node.js from https://nodejs.org/"
        )
        sys.exit(1)

    # Set the backend directory path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(current_dir, "backend")

    if not os.path.exists(backend_dir):
        print(f"❌ Error: Could not find 'backend' directory at {backend_dir}")
        sys.exit(1)

    print(f"📂 Navigating to backend folder: {backend_dir}")
    os.chdir(backend_dir)

    # 2. Check if node_modules exists, run npm install if not
    if not os.path.exists(os.path.join(backend_dir, "node_modules")):
        print(
            "⏳ First time setup detected. Installing dependencies... (this may take a minute)"
        )
        try:
            subprocess.run(["npm", "install"], check=True, shell=True)
            print("✅ Dependencies installed successfully.")
        except subprocess.CalledProcessError:
            print("❌ Error installing dependencies.")
            sys.exit(1)

    # 3. Start the Node.js server
    print("\n⏳ Starting the server...")

    # Run the server as a subprocess
    server_process = subprocess.Popen(["node", "server.js"], shell=True)

    # Wait a couple of seconds for the server to spin up
    print("⏳ Waiting for server to initialize...")
    time.sleep(3)

    # 4. Open the browser
    url = "http://localhost:5000"
    print(f"\n🌐 Opening browser to {url} ...")
    webbrowser.open(url)

    print(
        "\n✅ Application is running! Keep this window open to keep the server alive."
    )
    print("Press Ctrl+C to stop the server and exit.")

    try:
        # Keep the script running to keep the server process alive
        server_process.wait()
    except KeyboardInterrupt:
        print("\n🛑 Shutting down server...")
        server_process.kill()
        print("✅ Server stopped. Goodbye!")


if __name__ == "__main__":
    run_app()
