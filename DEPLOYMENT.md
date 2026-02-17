# Deployment Guide (Docker)
**Target Server:** 173.208.162.233

This guide details how to deploy your portfolio using **Docker**, ensuring it runs alongside your existing services without port conflicts.

## 1. Prerequisites
Ensure you are logged into your server:
```bash
ssh root@173.208.162.233
```
You already have Docker installed (based on your `docker ps` output).

## 2. Project Setup
1.  **Transfer Files**: Copy your project to the server (e.g., `/opt/calvin_portfolio`).
    ```bash
    # From your local machine
    scp -r /path/to/calvin_portfolio root@173.208.162.233:/opt/calvin_portfolio
    ```
2.  **Navigate to Directory**:
    ```bash
    cd /opt/calvin_portfolio/calvin_portfolio
    ```
    *Make sure this directory contains `Dockerfile` and `docker-compose.yml`.*

## 3. Docker Deployment
We have configured `docker-compose.yml` to run your portfolio on **Port 8001** to avoid conflict with your existing `rsci-web` (Port 8000) and `nginx` (Port 80).

1.  **Build and Start**:
    ```bash
    docker-compose up -d --build
    ```
2.  **Verify**:
    ```bash
    docker ps
    ```
    You should see `calvin_portfolio_web` running on `0.0.0.0:8001->8000/tcp`.

3.  **Access**:
    You can now access your site at: `http://173.208.162.233:8001`

## 4. SSL & Domain Configuration (Important)
Since your server already runs an Nginx container (`rsci-nginx`) handling ports 80 and 443, you **cannot** run another standalone web server on those ports.

To get SSL and use a domain (e.g., `calvinportfolio.com`), you must configure your **EXISTING** Nginx to proxy traffic to your new container.

### Option A: Edit Existing Nginx Config (If you control it)
1.  **Find where `rsci-nginx` stores its config**:
    Run the following command to see the mounted volumes:
    ```bash
    docker inspect -f '{{ range .Mounts }}{{ .Source }} -> {{ .Destination }}{{ "\n" }}{{ end }}' rsci-nginx
    ```
    Look for a line that maps to `/etc/nginx/conf.d` or `/etc/nginx/nginx.conf`.
    *Example Output:* `/opt/rsci/nginx/conf.d -> /etc/nginx/conf.d`
    
    This means your config files are in `/opt/rsci/nginx/conf.d` on the host machine.

2.  **Add a new server block** (e.g., `calvin_portfolio.conf`) in that directory:
    ```nginx
    server {
        listen 80;
        server_name calvinportfolio.com www.calvinportfolio.com;

        location / {
            proxy_pass http://173.208.162.233:8001; # Proxy to your new Docker app
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
    ```
3.  Restart the existing nginx container: `docker restart rsci-nginx`.
4.  Run Certbot (using your existing `rsci-certbot` or similar) to get SSL for this new domain.

### Option B: Quick Access (No SSL yet)
Just use `http://173.208.162.233:8001`.

## 5. Maintenance
- **Update Code**: Pull changes, then run `docker-compose up -d --build`.
- **Logs**: `docker-compose logs -f`.
- **Migrations**: `docker-compose exec web python manage.py migrate`.
