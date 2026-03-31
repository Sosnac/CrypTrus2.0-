#!/usr/bin/env python3
"""
CryPTrus2.0- - IoT Information Gathering Tool for Termux
Optimized for non-root Termux environments
Author: David Sosnac
Version: 2.0
"""
from network_scanner import NetworkScanner
from device_detection import DeviceDetection

# Initialize them
scanner = NetworkScanner()
detector = DeviceDetection()
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import argparse
import json
import subprocess
from datetime import datetime
from pathlib import Path

# Add modules to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'modules'))

from network_scanner import NetworkScanner
from device_detection import DeviceDetector
from iot_identifier import IoTIdentifier
from vulnerability_checker import VulnerabilityChecker
from data_parser import DataParser

class CrypTrus2:
    """Main CrypTrus2.0 IoT Information Gathering Tool"""
    
    def __init__(self):
        self.version = "2.0"
        self.output_dir = Path("output")
        self.output_dir.mkdir(exist_ok=True)
        self.timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.results = {}
        
    def print_banner(self):
        """Display tool banner"""
        banner = """
        ╔═══════════════════════════════════════════════════════╗
        ║     🔥 CrypTrus 2.0 - IoT Intelligence Gatherer ⚡    ║
        ║          Termux Non-Root Edition v2.0                ║
        ║                                                       ║
        ║     Advanced IoT Device Detection & Analysis          ║
        ╚═══════════════════════════════════════════════════════╝
        """
        print(banner)
    
    def scan_network(self, target_range):
        """Scan network for active devices"""
        print("\n[*] Initiating Network Scan...")
        print(f"[*] Target Range: {target_range}")
        
        scanner = NetworkScanner()
        devices = scanner.scan(target_range)
        self.results['network_scan'] = devices
        
        print(f"[+] Found {len(devices)} active devices")
        return devices
    
    def detect_devices(self, devices):
        """Detect IoT devices and gather information"""
        print("\n[*] Analyzing Device Information...")
        
        detector = DeviceDetector()
        identified_devices = []
        
        for device in devices:
            info = detector.get_device_info(device)
            identified_devices.append(info)
            print(f"[+] Device: {device} - {info.get('manufacturer', 'Unknown')}")
        
        self.results['device_detection'] = identified_devices
        return identified_devices
    
    def identify_iot(self, devices):
        """Identify IoT devices specifically"""
        print("\n[*] Scanning for IoT Devices...")
        
        iot_identifier = IoTIdentifier()
        iot_devices = []
        
        for device in devices:
            if iot_identifier.is_iot_device(device):
                iot_info = iot_identifier.get_iot_details(device)
                iot_devices.append(iot_info)
                print(f"[+] IoT Device Found: {iot_info.get('name', 'Unknown')} ({iot_info.get('type', 'Unknown')})")
        
        self.results['iot_devices'] = iot_devices
        return iot_devices
    
    def check_vulnerabilities(self, iot_devices):
        """Check for known vulnerabilities"""
        print("\n[*] Checking for Known Vulnerabilities...")
        
        vuln_checker = VulnerabilityChecker()
        vulns = []
        
        for device in iot_devices:
            device_vulns = vuln_checker.check(device)
            if device_vulns:
                vulns.extend(device_vulns)
                print(f"[!] Vulnerabilities found in {device.get('name', 'Unknown')}: {len(device_vulns)}")
        
        self.results['vulnerabilities'] = vulns
        return vulns
    
    def save_results(self):
        """Save results to file"""
        output_file = self.output_dir / f"cryptrus2_scan_{self.timestamp}.json"
        
        with open(output_file, 'w') as f:
            json.dump(self.results, f, indent=2, default=str)
        
        print(f"\n[+] Results saved to: {output_file}")
        return output_file
    
    def run(self, args):
        """Execute full scan"""
        self.print_banner()
        
        try:
            # Network scanning
            if args.scan:
                devices = self.scan_network(args.target)
            else:
                print("[*] Skipping network scan")
                devices = []
            
            # Device detection
            if devices and args.detect:
                self.detect_devices(devices)
            
            # IoT identification
            if devices and args.iot:
                iot_devices = self.identify_iot(devices)
            
            # Vulnerability checking
            if iot_devices and args.vuln:
                self.check_vulnerabilities(iot_devices)
            
            # Save results
            if args.save:
                self.save_results()
            
            print("\n[+] Scan completed successfully! 🔥⚡")
            
        except Exception as e:
            print(f"[!] Error during scan: {str(e)}")
            return False
        
        return True

def main():
    parser = argparse.ArgumentParser(
        description='CrypTrus2.0 - IoT Information Gathering Tool for Termux',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 cryptrus2.0.py -t 192.168.1.0/24 --scan --detect --iot --vuln --save
  python3 cryptrus2.0.py -t 10.0.0.0/24 --scan --iot
  python3 cryptrus2.0.py -t 192.168.0.0/24 --all
        """
    )
    
    parser.add_argument('-t', '--target', required=True, help='Target network range (e.g., 192.168.1.0/24)')
    parser.add_argument('--scan', action='store_true', help='Perform network scan')
    parser.add_argument('--detect', action='store_true', help='Detect devices')
    parser.add_argument('--iot', action='store_true', help='Identify IoT devices')
    parser.add_argument('--vuln', action='store_true', help='Check vulnerabilities')
    parser.add_argument('--save', action='store_true', default=True, help='Save results to file')
    parser.add_argument('--all', action='store_true', help='Run all modules')
    parser.add_argument('-v', '--verbose', action='store_true', help='Verbose output')
    
    args = parser.parse_args()
    
    # If --all flag is set, enable all modules
    if args.all:
        args.scan = args.detect = args.iot = args.vuln = args.save = True
    
    # Ensure at least one module is selected
    if not any([args.scan, args.detect, args.iot, args.vuln]):
        parser.print_help()
        sys.exit(1)
    
    tool = CrypTrus2()
    success = tool.run(args)
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()