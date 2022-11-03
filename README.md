### Monitoring Web Server
[Collector](https://github.com/kwondns/monitoring-collector)



#### 1. Edit .env 

`MONGODB_URI="mongodb://MongoURL/DBNAME"`

`MONGODB_DB="db"`

`SECRET_ACCESS='SECRET'`

`SECRET_REFRESH='SECRET'`

#### 2-1 Local Version
`yarn start`

#### 2-2 Docker Version
`docker-compose up --build`

#### Docker Default Setting
DB_IP: 10.10.0.10

WEB_IP: 10.10.0.11

WEB_PORT: 4000
