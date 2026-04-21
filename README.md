![CrypTrus 2.0](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=CrypTrus%202.0&fontSize=70&fontAlignY=40&desc=Advanced%20Cryptography%20Simplified&descAlignY=60&descAlign=50)

<div align="center">

  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="SHELL" src="https://img.shields.io/badge/SHELL-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white" />
  <img alt="Python"
src="https://img.shields.io/badge/PYTHON-F7DF1E?style=for-the-badge&logo=python&logoColor=blue"/>

</div>

<br />

![Project Overview](https://capsule-render.vercel.app/api?type=rect&color=gradient&height=60&section=header&text=Project%20Overview&fontSize=25)

**CrypTrus 2.0** is an advanced cryptography project that provides users with secure communication tools and intuitive encryption functionalities. It aims to simplify the encryption process while ensuring that the highest standards of security are maintained.

<br />

![Features](https://capsule-render.vercel.app/api?type=rect&color=gradient&height=60&section=header&text=Features&fontSize=25)

* **User-Friendly Interface:** Easy to navigate and use.
* **Strong Encryption:** Utilizes the latest algorithms to ensure data protection.
* **Cross-Platform Compatibility:** Works seamlessly on various operating systems.
* **Real-Time Encryption:** Encrypts data as you type.
* **Extensible Architecture:** Easily add plugins and extensions.

<br />

![Technologies Used](https://capsule-render.vercel.app/api?type=rect&color=gradient&height=60&section=header&text=Technologies%20Used&fontSize=25)

* **Node.js:** Server-side environment.
* **NPM:** Package management.
* **JavaScript/TypeScript:** Core logic and encryption implementation.
* **React/HTML/CSS:** User interface (runs on port 3443).

<br />

![Quick Start](https://capsule-render.vercel.app/api?type=rect&color=gradient&height=60&section=header&text=Quick%20Start&fontSize=25)

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Dsosnac-TEC-Enterprise/CrypTrus2.0.git
cd CrypTrus2.0
```


### 2. Install Dependencies
```bash
npm install
```


### 3. Run The Application
```bash
node index.js
```

### 4. Certificate Management
Replace the default cert.pem with your organization's CA-signed certificates for production use. OR if you don't have any CA signed certificate then run the below command in your terminal in CrypTrus2.0 ls directory to generate a self-signed certificate for SSL/TLS Encryption even though your browser will flag the certificate just advance because the Certificate Authority can't verify the certificate but the encryption will still work.
```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365 -subj "/C=ZM/ST=Lusaka/L=Lusaka/O=CryPTrus/OU=Security/CN=localhost"
``` 

### 5. Access the Application
Open your browser and go to: https://localhost:3443

<br />

![Author](https://capsule-render.vercel.app/api?type=rect&color=gradient&height=60&section=header&text=Author&fontSize=25)

**David Sosnac** 

This project is licensed under the MIT License - see the LICENSE file for details.




