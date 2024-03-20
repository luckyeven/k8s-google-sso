# Kubernetes Deployment with Syslog Configuration

This repository contains Kubernetes deployment files for setting up a syslog server and client, along with a Google SSO web application.

## Syslog Server and Client Setup

1. **Syslog Server Setup:**
   - Apply the deployment file for the syslog server:
     ```
     kubectl apply -f rsyslog-server-deployment.yaml
     ```
   - Apply the service file for the syslog server:
     ```
     kubectl apply -f rsyslog-server-service.yaml
     ```
   - Obtain the IP address of the service using:
     ```
     kubectl get svc
     ```
     Note down the IP address for future reference.

2. **Syslog Client Setup:**
   - Replace the IP address in the `rsyslog-client-deployment.yaml` file with the IP address of the syslog server obtained in the previous step.
   - Apply the deployment file for the syslog client:
     ```
     kubectl apply -f rsyslog-client-deployment.yaml
     ```
   - Test the syslog client by executing:
     ```
     logger "test"
     ```
     Navigate to the syslog server, go to the `/var/log` directory, and check if the logs are received.

## Google SSO Web Application Setup

1. **Frontend Setup:**
   - Build the Docker image for the frontend application and push it to Docker Hub.
   - Apply the deployment file for the Google SSO frontend (replace the image with your own):
     ```
     kubectl apply -f google-sso-deployment.yaml
     ```
   - Apply the service file for the Google SSO frontend:
     ```
     kubectl apply -f google-sso-service.yaml
     ```
   - Perform port forwarding for accessing the frontend:
     ```
     kubectl port-forward <google-sso-pod-name> 8080:80
     ```

2. **Backend Setup:**
   - Update the Dockerfile for the backend Flask application and push it to Docker Hub.
   - Apply the deployment file for the syslog client:
     ```
     kubectl apply -f rsyslog-client-development.yaml
     ```

more details on documentation [here](https://docs.google.com/document/d/1Ql4XEaBLdBoDa1Q71BJzmhZXb2rImhBiU-_xXflimI8/edit?usp=sharing)

