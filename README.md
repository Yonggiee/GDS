# Shorty

# A URL Shortening Service

## Description
A URL shortening service (like [bit.ly](https://bit.ly)). Application hosted on [littleshorty.link](http://littleshorty.link).
- Shortens a given URL to a `shorty` URL
- Decodes `shorty` URL
- Redirects from `shorty` URL if stored in database

### Tech Stack
- Frontend
  - Angular
  - Particles.js

- Backend
  - Express.js
  - Postgresql

- DevOps
  - Docker
  - Terraform

## Deployment

### Production
[littleshorty.link](http://littleshorty.link)

### Local

#### Prerequisites
- Docker
- Docker Compose

#### Steps
```
docker compose up deploy/docker/docker-compose.yml
```

## Additional Features

| Name                                          | Check     |
| --------------------------------------------- | --------- |
| Responsive Layout                             |  &check;  |
| Persistent Storage                            |  &check;  |
| Push to Production                            |  &check;  |
| Test Cases                                    |           |
| Containers                                    |  &check;  |
| Cron task to remove URL not used for 30 days  |  &check;  |

### Design Considerations

| Consideration                                                               | Analysis       |
| --------------------------------------------------------------------------- | -------------- |
| Shortening the URL to be short, maintain ACID properties and able to scale  | 1) Use a hashing algorithm <br> + Quick with existing libraries and don't strain server resources <br> - URL becomes long due to fix-sized hash <br> - Will run out of links as hash is fix-sized <br> <br> 2) Use server logic <br> + Can do complex shortening logic <br> - Not easy to identify method to change URL to decimal, then to another base eg. 64 <br> - `shorty` URL can still be very long if just encode the given URL <br> <br> 3) Use database function <br> + ACID properties confirmed <br> + Database can optimise queries for better runtime <br> + Generated URL is definitely collision resistant <br> - Strain database resources <br> - Hard to do encoding logic in SQL queries <br> <br> I chose to use database function with slight server logic. The idea is to use the lowest available ID (primary key) and encode them to get the new URL. However, as there is a need to have ACID properties, the record needs to be created first so no other URL is encoded with the same ID. The given ID is then encoded with base 62 (a-zA-Z0-9 in random order) and the record is updated. This makes the URL look random and also is the shortest URL possible. Only con is that it strains the database so it is hard to scale. |

#### GDS Note

Work Done after deadline

- Ability to redirect using `shorty` URL
- Write Docs
