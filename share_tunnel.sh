#!/usr/bin/env bash

# LabXplore Public URL Tunnel Script
# Uses Cloudflare Quick Tunnel (Free, HTTPS, No account needed)

ACTION=${1:-"status"}

case "$ACTION" in
  start)
    if pgrep -f "cloudflared tunnel.*5173" > /dev/null; then
      echo "Cloudflare tunnel is already running."
    else
      nohup /opt/homebrew/bin/cloudflared tunnel --url http://localhost:5173 > /Users/samuel/Documents/JARVIS/tunnel.log 2>&1 &
      echo "Starting tunnel, please wait..."
      sleep 4
    fi
    URL=$(grep -o 'https://[^ ]*\.trycloudflare\.com' /Users/samuel/Documents/JARVIS/tunnel.log | head -n 1)
    echo ""
    echo "=========================================================="
    echo "🎉 PUBLIC SHAREABLE URL:"
    echo "👉 $URL"
    echo "=========================================================="
    ;;
  stop)
    pkill -f "cloudflared tunnel.*5173"
    echo "Tunnel stopped."
    ;;
  status)
    if pgrep -f "cloudflared tunnel.*5173" > /dev/null; then
      URL=$(grep -o 'https://[^ ]*\.trycloudflare\.com' /Users/samuel/Documents/JARVIS/tunnel.log | head -n 1)
      echo "Tunnel is active!"
      echo "👉 Public URL: $URL"
    else
      echo "Tunnel is not running. Run './share_tunnel.sh start' to start it."
    fi
    ;;
  *)
    echo "Usage: ./share_tunnel.sh [start|status|stop]"
    ;;
esac
