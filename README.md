# CasaOS Upstart Package

## Overview
This package ports CasaOS v0.4.15 to Upstart-based systems (Ubuntu 14.04 and earlier, older RHEL/CentOS).

## Features
- ✅ Native Upstart job configurations
- ✅ Automatic dependency chaining with `start on` directives
- ✅ Auto-respawn on crashes
- ✅ All 6 CasaOS microservices included
- ✅ Complete web UI (39MB)
- ✅ Auto-start on boot

## Package Files

1. **casaos-upstart_0.4.15.deb** (56MB) - For Debian-based systems
2. **casaos-upstart-0.4.15.tar.gz** (59MB) - Universal tarball
3. **install-upstart.sh** - Universal installer script (auto-detects OS)

## Package Contents
- 6 Upstart job configs in `/etc/init/`
- 6 CasaOS binaries in `/usr/bin/`
- Configuration files in `/etc/casaos/`
- Web UI in `/var/lib/casaos/www/`

## Services Included
1. casaos-message-bus - Inter-service communication
2. casaos-gateway - API gateway and web server
3. casaos-user-service - User authentication
4. casaos-local-storage - File management
5. casaos-app-management - Docker/app management
6. casaos - Main service

## Installation

### Quick Install (Recommended)
```bash
# Universal installer - auto-detects your system
sudo bash install-upstart.sh
```

### Manual - Debian-based systems (Ubuntu 14.04, etc.)
```bash
sudo dpkg -i casaos-upstart_0.4.15.deb
```

### Manual - Universal (any Upstart system)
```bash
# Extract tarball
cd / && sudo tar xzf /path/to/casaos-upstart-0.4.15.tar.gz

# Make binaries executable
sudo chmod +x /usr/bin/casaos*

# Reload Upstart configuration
sudo initctl reload-configuration

# Start services (dependencies auto-start)
for svc in casaos-message-bus casaos-gateway casaos-user-service casaos-local-storage casaos-app-management casaos; do
    sudo initctl start $svc
    sleep 2
done
```

Services auto-start after installation.

## Usage
```bash
# Start/stop services
sudo initctl start casaos
sudo initctl stop casaos
sudo initctl restart casaos
sudo initctl status casaos

# List all Upstart jobs
initctl list | grep casaos

# View service logs
tail -f /var/log/upstart/casaos.log
```

## Upstart Features
- Declarative service dependencies (`start on started <service>`)
- Automatic respawning on crashes (`respawn`)
- Respawn limits to prevent boot loops (`respawn limit 10 5`)
- Pre-start scripts for directory creation
- Simple, readable configuration

## Service Dependencies
Services automatically start in order based on `start on` directives:
1. casaos-message-bus (starts on runlevel [2345])
2. casaos-gateway (starts on started casaos-message-bus)
3. casaos-user-service (starts on started casaos-gateway)
4. casaos-local-storage (starts on started casaos-user-service)
5. casaos-app-management (starts on started casaos-local-storage)
6. casaos (starts on started casaos-app-management)

## Access
Web interface: http://localhost (or your server IP)

## Compatibility
- Ubuntu 9.10 through 14.10 (before systemd)
- RHEL/CentOS 6
- Any other Upstart-based distribution

## Differences from Other Versions
- **vs systemd**: Uses job files in `/etc/init/` instead of unit files
- **vs sysvinit**: Simpler syntax, automatic dependency management
- **vs OpenRC**: Upstart-specific declarative format

Version Ported **Date:** 2 December 2025
Build Version: 0.4.15
License: Apache 2.0

## Maintainer Information

**Original Package Maintainer:** CasaOS Team <support@casaos.io>

**Maintainer of these ported packages:** Nobody really - these are just working proof of concepts. Well, I fixed it to work on sysvinit and ported that one to the other init systems.

Initially I just wanted CasaOS to work on Devuan Linux so I could make much more efficient bootable/installable images I can restore/install to my own home computers etc.

**PLEASE NOTE:** From the very first moment you ponder to try these, make a backup of the OS state and take it that **there's no responsibility of any description** because they were just for me and I am sharing for anyone to look at.

All original coding I didn't port belongs to the copyrighted maker/creator.

**P.S.** IceWhale/Zema: I didn't modify any API stuff so it uses your API as it was programmed originally, so please, don't sue - I'm just tryna make the proof of concept available for others to ponder.

**P.S.S.** I have help in parts with Claude AI, for the tricky sections. I'm no coder but I do know my way around a penguin-based OS heh.
