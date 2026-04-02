  #!/usr/bin/env bash
  set -e
  NIX_CONF="$HOME/.config/nix/nix.conf"
  mkdir -p "$(dirname "$NIX_CONF")"
  if ! grep -q "experimental-features" "$NIX_CONF" 2>/dev/null; then
    echo 'experimental-features = nix-command flakes' >> "$NIX_CONF"
    echo "Enabled nix-command and flakes in $NIX_CONF"
  else
    echo "Nix experimental features already configured"
  fi
  echo ""
  echo "Now run: nix develop"