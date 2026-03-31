import subprocess
import platform

class NetworkScanner:
    """Handles scanning the local network for active hosts."""

    def __init__(self):
        self.os_type = platform.system().lower()

    def ping_host(self, ip_address):
        """
        Pings a single host to check if it is online.
        :param ip_address: The IP to test
        :return: Boolean (True if online)
        """
        # Determine the correct ping flag based on OS
        flag = "-n" if self.os_type == "windows" else "-c"
        command = ["ping", flag, "1", ip_address]
        
        try:
            output = subprocess.run(command, capture_output=True, text=True, check=False)
            return output.returncode == 0
        except Exception:
            return False

    def scan_range(self, base_ip):
        """Simple scan of a .1 to .10 range for demo purposes."""
        active_hosts = []
        for i in range(1, 11):
            ip = f"{base_ip}.{i}"
            if self.ping_host(ip):
                active_hosts.append(ip)
        return active_hosts
