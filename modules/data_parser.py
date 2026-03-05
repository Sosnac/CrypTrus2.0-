#!/usr/bin/env python3
"""
Data Parser Module - Parses and formats scan results
"""

import json
from typing import Dict, List, Any
from pathlib import Path

class DataParser:
    """Data parsing and formatting"""
    
    @staticmethod
    def export_json(data: Dict, filepath: str) -> bool:
        """Export data to JSON file"""
        try:
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2, default=str)
            return True
        except Exception as e:
            print(f"[!] Error exporting JSON: {e}")
            return False
    
    @staticmethod
    def export_csv(data: Dict, filepath: str) -> bool:
        """Export data to CSV format"""
        try:
            import csv
            
            devices = data.get('device_detection', [])
            if not devices:
                return False
            
            with open(filepath, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=devices[0].keys())
                writer.writeheader()
                writer.writerows(devices)
            
            return True
        except Exception as e:
            print(f"[!] Error exporting CSV: {e}")
            return False
    
    @staticmethod
    def format_report(data: Dict) -> str:
        """Format data as text report"""
        report = []
        report.append("=" * 60)
        report.append("CrypTrus2.0 - Scan Report")
        report.append("=" * 60)
        
        # Network scan results
        network_scan = data.get('network_scan', [])
        report.append(f"\nActive Hosts: {len(network_scan)}")
        
        # Device detection results
        devices = data.get('device_detection', [])
        report.append(f"Devices Detected: {len(devices)}\n")
        
        for device in devices:
            report.append(f"  IP: {device.get('ip')}")
            report.append(f"  Hostname: {device.get('hostname')}")
            report.append(f"  Manufacturer: {device.get('manufacturer')}")
            report.append(f"  Open Ports: {device.get('open_ports')}\n")
        
        # IoT devices
        iot_devices = data.get('iot_devices', [])
        report.append(f"\nIoT Devices Found: {len(iot_devices)}\n")
        
        for iot in iot_devices:
            report.append(f"  Name: {iot.get('name')}")
            report.append(f"  Type: {iot.get('type')}")
            report.append(f"  IP: {iot.get('ip')}\n")
        
        # Vulnerabilities
        vulns = data.get('vulnerabilities', [])
        report.append(f"\nVulnerabilities Found: {len(vulns)}\n")
        
        for vuln in vulns:
            report.append(f"  {vuln.get('name')} [{vuln.get('severity')}]")
            report.append(f"    CVE: {vuln.get('cve')}")
            report.append(f"    {vuln.get('description')}\n")
        
        report.append("=" * 60)
        
        return "\n".join(report)
