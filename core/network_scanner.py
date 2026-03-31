#!/usr/bin/env python3
"""
Network Scanner Module - Scans for active hosts using ARP and ICMP
Termux-compatible: Uses subprocess to call system tools
"""

import subprocess
import socket
import ipaddress
from typing import List, Dict

class NetworkScanner:
    """Network scanning functionality"""

    def __init__(self):
        self.timeout = 2
        self.active_hosts = []

    def scan(self, target_range: str) -> List[str]:
        """
        Scan network range for active hosts
        Uses ping sweep method (compatible with Termux)
        """
        active_hosts = []

        try:
            network = ipaddress.ip_network(target_range, strict=False)
            total_hosts = list(network.hosts())

            print(f"[*] Scanning {len(total_hosts)} hosts...")

            for host in total_hosts:
                if self._is_host_alive(str(host)):
                    active_hosts.append(str(host))
                    print(f"[+] Host alive: {host}")

        except ValueError as e:
            print(f"[!] Invalid network range: {e}")
            return []

        self.active_hosts = active_hosts
        return active_hosts

    def _is_host_alive(self, host: str) -> bool:
        """Check if host is alive using ping"""
        try:
            # Termux-compatible ping command
            result = subprocess.run(
                ['ping', '-c', '1', '-W', '1', host],
                capture_output=True,
                timeout=2
            )
            return result.returncode == 0
        except (subprocess.TimeoutExpired, FileNotFoundError):
            return False

    def get_active_hosts(self) -> List[str]:
        """Return list of active hosts"""
        return self.active_hosts