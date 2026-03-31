#!/usr/bin/env python3
"""
IoT Identifier Module - Identifies IoT devices based on characteristics
"""

from typing import Dict, List, Any
import socket

class IoTIdentifier:
    """IoT device identification logic"""

    def __init__(self):
        self.iot_signatures = self._load_iot_signatures()

    def _load_iot_signatures(self) -> Dict[str, Dict]:
        """Load IoT device signatures and characteristics"""
        return {
            'camera': {
                'keywords': ['camera', 'cam', 'ipv6', 'motion'],
                'ports': [554, 8080, 8081, 8000, 9000],
                'type': 'IP Camera'
            },
            'router': {
                'keywords': ['router', 'gateway', 'wifi'],
                'ports': [80, 443, 8080],
                'type': 'Network Router'
            },
            'printer': {
                'keywords': ['printer', 'xerox', 'hp', 'canon'],
                'ports': [9100, 515, 631, 80],
                'type': 'Smart Printer'
            },
            'thermostat': {
                'keywords': ['thermostat', 'hvac', 'temperature'],
                'ports': [80, 443],
                'type': 'Smart Thermostat'
            },
            'light': {
                'keywords': ['light', 'lamp', 'bulb', 'philips'],
                'ports': [80, 443, 5353],
                'type': 'Smart Light'
            },
            'speaker': {
                'keywords': ['speaker', 'alexa', 'sonos', 'audio'],
                'ports': [8080, 8000, 5353],
                'type': 'Smart Speaker'
            },
            'doorbell': {
                'keywords': ['doorbell', 'door', 'ring'],
                'ports': [80, 443],
                'type': 'Smart Doorbell'
            },
            'lock': {
                'keywords': ['lock', 'yale', 'schlage'],
                'ports': [80, 443, 5353],
                'type': 'Smart Lock'
            }
        }

    def is_iot_device(self, ip_address: str) -> bool:
        """Determine if a device is likely an IoT device"""
        # Simple heuristic: check open ports and hostname
        hostname = self._get_hostname(ip_address)

        for device_type, sig in self.iot_signatures.items():
            for keyword in sig['keywords']:
                if keyword.lower() in hostname.lower():
                    return True

        return False

    def get_iot_details(self, ip_address: str) -> Dict[str, Any]:
        """Get detailed information about IoT device"""
        hostname = self._get_hostname(ip_address)
        device_type = self._identify_device_type(hostname)

        return {
            'ip': ip_address,
            'hostname': hostname,
            'name': self._extract_device_name(hostname),
            'type': device_type,
            'potential_risks': self._assess_risks(ip_address, device_type)
        }

    def _get_hostname(self, ip: str) -> str:
        """Get hostname from IP"""
        try:
            return socket.gethostbyaddr(ip)[0]
        except:
            return ip

    def _identify_device_type(self, hostname: str) -> str:
        """Identify device type from hostname"""
        hostname_lower = hostname.lower()

        for device_type, sig in self.iot_signatures.items():
            for keyword in sig['keywords']:
                if keyword in hostname_lower:
                    return sig['type']

        return "Unknown IoT Device"

    def _extract_device_name(self, hostname: str) -> str:
        """Extract friendly device name from hostname"""
        # Remove common prefixes
        name = hostname.split('.')[0]
        return name.replace('-', ' ').title()

    def _assess_risks(self, ip: str, device_type: str) -> List[str]:
        """Assess potential security risks"""
        risks = []

        if "Unknown" in device_type:
            risks.append("Unknown device type")

        risks.append("Default credentials possible")
        risks.append("Outdated firmware")

        return risks