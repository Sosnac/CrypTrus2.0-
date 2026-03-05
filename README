# 🔥⚡ CrypTrus2.0 - IoT Information Gathering Tool

## **Termux Non-Root Edition v2.0**

Advanced IoT device detection, identification, and vulnerability assessment tool optimized for Termux environments without requiring root/superuser privileges.

---

## 📋 Features

✅ **Network Scanning** - ARP and ICMP-based host discovery  
✅ **Device Detection** - Identify devices and gather system information  
✅ **IoT Identification** - Detect and classify IoT devices  
✅ **Vulnerability Assessment** - Check for known vulnerabilities  
✅ **Non-Root Compatible** - Works perfectly in Termux without sudo  
✅ **Flexible Output** - JSON, CSV, and text report formats  
✅ **Termux Optimized** - Designed specifically for mobile environments  

---

## 🚀 Quick Start

### Prerequisites
- Termux installed (F-Droid or Google Play)
- Internet connection
- ~50MB free storage

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Sosnac/CryPTrus2.0-.git
cd CrypTrus2.0

# 2. Run setup script (automated installation)
bash setup.sh

# 3. Grant storage permissions (when prompted)
```

---

## ⚡ Launch Commands in Termux

### **After Cloning:**

```bash
# Navigate to project directory
cd CrypTrus2.0

# Make setup executable and run
chmod +x setup.sh
bash setup.sh
```

### **Basic Usage:**

```bash
# Quick network scan
python3 cryptrus2.0.py -t 192.168.1.0/24 --scan

# Full IoT scan with all modules
python3 cryptrus2.0.py -t 192.168.1.0/24 --all

# IoT and vulnerability check
python3 cryptrus2.0.py -t 192.168.1.0/24 --scan --iot --vuln --save

# Device detection only
python3 cryptrus2.0.py -t 192.168.1.0/24 --detect
```

### **Interactive Mode:**

```bash
# Make launcher executable
chmod +x termux/launcher.sh

# Run interactive menu
./termux/launcher.sh
```

### **Advanced Usage:**

```bash
# Scan specific range with verbose output
python3 cryptrus2.0.py -t 10.0.0.0/24 --all -v

# Custom module combination
python3 cryptrus2.0.py -t 192.168.0.0/24 --scan --detect --save

# Check help
python3 cryptrus2.0.py --help
```

---

## 📁 Project Structure

```
CrypTrus2.0/
├── cryptrus2.0.py                 # Main application
├── setup.sh                        # Automated setup script
├── requirements.txt                # Python dependencies
├── README.md                       # Documentation
├── modules/
│   ├── __init__.py
│   ├── network_scanner.py         # Network discovery
│   ├── device_detection.py        # Device info gathering
│   ├── iot_identifier.py          # IoT device detection
│   ├── vulnerability_checker.py   # Vulnerability assessment
│   └── data_parser.py             # Results processing
├── configs/
│   ├── config.yaml                # Configuration file
│   └── networks.txt               # Network list
├── termux/
│   ├── launcher.sh                # Interactive launcher
│   └── install.sh                 # Manual install
└── output/                        # Scan results (auto-created)
```

---

## 🔧 Configuration

Edit `configs/config.yaml` for custom settings:

```yaml
network:
  timeout: 2
  threads: 10
  retries: 1

iot:
  enable_signature_matching: true
  enable_vendor_lookup: true
  cache_results: true

output:
  format: json
  save_directory: ./output
  timestamp_results: true
```

---

## 📊 Scan Results

Results are saved in `output/` directory with timestamps:

```
output/
├── cryptrus2_scan_20260304_143022.json
├── cryptrus2_scan_20260304_150145.json
└── ...
```

### Result Format

```json
{
  "network_scan": ["192.168.1.1", "192.168.1.10", "192.168.1.50"],
  "device_detection": [
    {
      "ip": "192.168.1.1",
      "hostname": "router.local",
      "manufacturer": "Cisco Systems",
      "open_ports": [80, 443]
    }
  ],
  "iot_devices": [
    {
      "ip": "192.168.1.50",
      "hostname": "camera-office",
      "name": "Office Camera",
      "type": "IP Camera"
    }
  ],
  "vulnerabilities": [
    {
      "name": "Default Credentials",
      "severity": "Critical",
      "cve": "N/A"
    }
  ]
}
```

---

## 🛡️ Security Notes

- **Non-Root Operation**: CrypTrus2.0 works without root/superuser privileges
- **Local Network Only**: Designed for local network reconnaissance
- **Educational Purpose**: Use responsibly and only on networks you own or have permission to test
- **No Packet Injection**: Uses standard system utilities (ping, arp, netcat)
- **No Kernel Modules**: Fully compatible with standard Termux installation

---

## 🐛 Troubleshooting

### "Command not found: python3"
```bash
apt update && apt install python3 python3-pip
```

### "Permission denied" on scripts
```bash
chmod +x cryptrus2.0.py setup.sh termux/launcher.sh
```

### "No module named 'pyyaml'"
```bash
pip install pyyaml
```

### Network scan times out
- Increase timeout in `configs/config.yaml`
- Check WiFi connection
- Verify target network is correct format (e.g., 192.168.1.0/24)

### Results not saving
```bash
mkdir -p output
chmod 755 output
```

---

## 📝 Example Workflows

### 1. **Quick Home Network Scan**
```bash
python3 cryptrus2.0.py -t 192.168.1.0/24 --all
```

### 2. **IoT Device Inventory**
```bash
python3 cryptrus2.0.py -t 192.168.1.0/24 --scan --detect --iot --save
```

### 3. **Vulnerability Assessment**
```bash
python3 cryptrus2.0.py -t 192.168.1.0/24 --scan --iot --vuln --save
```

### 4. **Scheduled Scans**
```bash
# Create a simple scan script
echo '#!/bin/bash' > daily_scan.sh
echo 'python3 cryptrus2.0.py -t 192.168.1.0/24 --all' >> daily_scan.sh
chmod +x daily_scan.sh
./daily_scan.sh
```

---

## 🔐 Ethical Use

**Important**: Always obtain proper authorization before scanning networks you don't own. Unauthorized network scanning may be illegal in your jurisdiction.

---

## 📚 Module Documentation

### NetworkScanner
- ICMP/Ping-based host discovery
- Supports CIDR notation
- Termux-compatible

### DeviceDetector
- MAC address lookup
- Manufacturer identification
- Open port detection
- Hostname resolution

### IoTIdentifier
- Signature-based device classification
- Common IoT device types
- Risk assessment

### VulnerabilityChecker
- Known vulnerability database
- Device-specific checks
- Generic IoT vulnerabilities

### DataParser
- JSON export
- CSV export
- Text report generation

---

## 🎯 Roadmap

- [ ] Database integration for vulnerability updates
- [ ] Web interface for result visualization
- [ ] API support for remote scanning
- [ ] Enhanced MAC vendor database
- [ ] Custom signature support
- [ ] Real-time alert notifications
- [ ] Multi-threading for faster scans
- [ ] Export to PDF reports

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Sosnac** - Creator of CrypTrus2.0  
GitHub: [@Sosnac](https://github.com/Sosnac)

---

## 🤝 Contributing

Contributions welcome! Feel free to fork and submit pull requests.

---

## 📞 Support

For issues, questions, or suggestions:
1. Check the Troubleshooting section
2. Review existing GitHub issues
3. Create a new issue with detailed description

---

## ⭐ Show Your Support

If you find CrypTrus2.0 useful, please star this repository!

🔥⚡ **Happy Hunting!** ⚡🔥

---

*Last Updated: 2026-03-04*  
*Version: 2.0 - Termux Non-Root Edition*