# JWT Privilege Escalation – CTF Challenge

This repository contains a Capture The Flag (CTF) challenge created as part of a university Master's project.  
The challenge focuses on **web security** and **JSON Web Token (JWT) misuse**.

## Challenge Description

You are given access to a web application running inside a Docker container.
The application uses JSON Web Tokens to manage user roles.

Your goal is to **gain access to the admin panel** and retrieve the flag.

The challenge is based on a **realistic JWT security flaw** and does not require brute force or source code modification.

## Learning Objectives

- Understand how JWTs work
- Identify insecure JWT handling
- Exploit a privilege escalation vulnerability
- Gain hands-on experience with web security concepts

## Running the Challenge

Clone the repository and run the following commands from the project root:

```bash
docker build -t jwt-challenge .
docker run -d --name jwt-challenge -p 3000:3000 jwt-challenge
```

The challenge will be available at :

http://localhost:3000

Rules : 
-Do not modify the source code
-Do not brute-force secrets (very easy to found)
-The flag is not important, but finding the way to get it through the exploit is 
