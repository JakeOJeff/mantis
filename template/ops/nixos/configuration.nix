{ config, pkgs, ... }:

{
  system.stateVersion = "24.11";

  # ── networking ──────────────────────────────────────────────────────────────
  networking.hostName = "mantis-server";
  networking.firewall.allowedTCPPorts = [ 22 80 443 8000 ];

  # ── ssh ─────────────────────────────────────────────────────────────────────
  services.openssh = {
    enable = true;
    settings.PasswordAuthentication = false;  # key only, no passwords
  };

  # ── postgres ─────────────────────────────────────────────────────────────────
  services.postgresql = {
    enable = true;
    package = pkgs.postgresql_16;
    ensureDatabases = [ "mantis" ];
    ensureUsers = [
      {
        name = "mantis";
        ensureDBOwnership = true;
      }
    ];
  };

  # ── fastapi app ──────────────────────────────────────────────────────────────
  systemd.services.mantis-app = {
    enable = true;
    description = "mantis fastapi backend";
    wantedBy = [ "multi-user.target" ];
    after = [ "postgresql.service" ];      # wait for postgres to start first

    environment = {
      DATABASE_URL = "postgresql://mantis@localhost:5432/mantis";
    };

    serviceConfig = {
      WorkingDirectory = "/app/backend";
      ExecStart = "/app/backend/.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000";
      Restart = "always";
      RestartSec = "5s";
      User = "mantis";
    };
  };

  # ── nextjs frontend ──────────────────────────────────────────────────────────
  systemd.services.mantis-frontend = {
    enable = true;
    description = "mantis nextjs frontend";
    wantedBy = [ "multi-user.target" ];

    serviceConfig = {
      WorkingDirectory = "/app/frontend";
      ExecStart = "${pkgs.nodejs_20}/bin/node server.js";
      Restart = "always";
      RestartSec = "5s";
      User = "mantis";
    };
  };

  # ── nginx reverse proxy ──────────────────────────────────────────────────────
  # sits in front of both services, routes traffic correctly
  services.nginx = {
    enable = true;
    virtualHosts."_" = {
      locations."/" = {
        proxyPass = "http://localhost:3000";   # nextjs
      };
      locations."/api/" = {
        proxyPass = "http://localhost:8000";   # fastapi
      };
    };
  };

  # ── app user ─────────────────────────────────────────────────────────────────
  users.users.mantis = {
    isSystemUser = true;
    group = "mantis";
    home = "/app";
  };
  users.groups.mantis = {};

  # ── packages available on server ─────────────────────────────────────────────
  environment.systemPackages = with pkgs; [
    git
    curl
    python312
    nodejs_20
  ];
}
