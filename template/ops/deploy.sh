#!/usr/bin/env bash
set -e

# Usage: ./deploy.sh <server-ip>
# Example: ./deploy.sh 123.456.789.0
#
# Requires:
#   - nixos-anywhere installed (nix run github:nix-community/nixos-anywhere)
#   - SSH access to the server as root
#   - A fresh Hetzner box running NixOS

SERVER_IP=$1

if [ -z "$SERVER_IP" ]; then
  echo "error: no server IP provided"
  echo "usage: ./deploy.sh <server-ip>"
  exit 1
fi

echo "deploying mantis to $SERVER_IP..."

nixos-anywhere \
  --flake .#mantis-server \
  root@$SERVER_IP

echo ""
echo "done! your server is live at $SERVER_IP"
echo ""
echo "next steps:"
echo "  ssh root@$SERVER_IP          # get into your server"
echo "  check systemctl status mantis-app   # confirm app is running"