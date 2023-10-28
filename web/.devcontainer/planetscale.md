---
created: 2023-10-28T14:55:00 (UTC +09:00)
tags: []
source: https://app.planetscale.com/w221492/tech/connect
author: 
---

# tech - Get connected - PlanetScale

> ## Excerpt
> To connect to PlanetScale from a Go application, you can use the Go-MySQL-Driver. If you prefer using a different client or ORM, any library that works with MySQL and SSL for connections is compatible with PlanetScale.

---
## Create a password

For security, each database password can connect to one branch.

The password **main-2023-10-28-lqojz3** has been created

Username

Copied

Password

Copied

Be sure to copy your password. It cannot be displayed again after initial creation.

## Configure your Go application

To connect to PlanetScale from a Go application, you can use the [Go-MySQL-Driver](https://github.com/go-sql-driver/mysql). If you prefer using a different client or ORM, any library that works with MySQL and SSL for connections is compatible with PlanetScale.

## [Installation](https://app.planetscale.com/w221492/tech/connect#installation)

First, install the MySQL driver:

Command line

Copied

```
go get -u github.com/go-sql-driver/mysql
```

```
go get -u github.com/go-sql-driver/mysql
```

_Note: If you have not yet initialized a `go.mod` file. You can by running `go mod init example.com/m/v2`._

Next, you can install [GoDotEnv](https://github.com/joho/godotenv) for accessing your database credentials:

Command line

Copied

```
go get -u github.com/joho/godotenv
```

```
go get -u github.com/joho/godotenv
```

## [Add credentials to .env](https://app.planetscale.com/w221492/tech/connect#add-credentials-to-env)

For local development, you can place your credentials in a `.env` file. For production, we recommend setting your credentials as environment variables wherever your application is deployed.

### 

Optimized

aws.connect.psdb.cloud

Using this hostname will optimize for the lowest latency between your application and database.

### Directap-southeast.connect.psdb.cloud

In some networking scenarios, using the direct connection may solve latency issues.

[Learn more](https://planetscale.com/docs/concepts/network-latency) about optimizing network latency with your PlanetScale database.

.env

Copied

```
DSN=61vv71p63sah18e33c0o:pscale_pw_3SFIjAffMfEZELv5VbnBStj7uSHHzJAKZmuq9FT3VbC@tcp(aws.connect.psdb.cloud)/tech?tls=true&interpolateParams=true
```

```
DSN=61vv71p63sah18e33c0o:pscale_pw_3SFIjAffMfEZELv5VbnBStj7uSHHzJAKZmuq9FT3VbC@tcp(aws.connect.psdb.cloud)/tech?tls=true&interpolateParams=true
```

## [Connecting and querying](https://app.planetscale.com/w221492/tech/connect#connecting-and-querying)

Now, in your application, you can use godotenv to load in the credentials and connect to PlanetScale. This example prints out all of the table names in your database:

main.go

Copied

```
package main

import (
    "database/sql"
    "log"
    "os"

    "github.com/joho/godotenv"
     _ "github.com/go-sql-driver/mysql"
)

func main() {
    // Load connection string from .env file
    err := godotenv.Load()
    if err != nil {
        log.Fatal("failed to load env", err)
    }

    // Open a connection to PlanetScale
    db, err := sql.Open("mysql", os.Getenv("DSN"))
    if err != nil {
        log.Fatalf("failed to connect: %v", err)
    }

    rows, err := db.Query("SHOW TABLES")
    if err != nil {
        log.Fatalf("failed to query: %v", err)
    }
    defer rows.Close()

    var tableName string
    for rows.Next() {
        if err := rows.Scan(&tableName); err != nil {
            log.Fatalf("failed to scan row: %v", err)
        }
        log.Println(tableName)
    }

    defer db.Close()
}
```

```
package main

import (
    "database/sql"
    "log"
    "os"

    "github.com/joho/godotenv"
     _ "github.com/go-sql-driver/mysql"
)

func main() {
    // Load connection string from .env file
    err := godotenv.Load()
    if err != nil {
        log.Fatal("failed to load env", err)
    }

    // Open a connection to PlanetScale
    db, err := sql.Open("mysql", os.Getenv("DSN"))
    if err != nil {
        log.Fatalf("failed to connect: %v", err)
    }

    rows, err := db.Query("SHOW TABLES")
    if err != nil {
        log.Fatalf("failed to query: %v", err)
    }
    defer rows.Close()

    var tableName string
    for rows.Next() {
        if err := rows.Scan(&tableName); err != nil {
            log.Fatalf("failed to scan row: %v", err)
        }
        log.Println(tableName)
    }

    defer db.Close()
}
```

## [Managing schema](https://app.planetscale.com/w221492/tech/connect#managing-schema)

For managing your database schema, we recommend using either [Skeema](https://github.com/skeema/skeema) or [golang-migrate](https://github.com/golang-migrate/migrate).

## [Learn more](https://app.planetscale.com/w221492/tech/connect#learn-more)

For a full tutorial on how to get started with Go and PlanetScale, see our [connect a Go application to PlanetScale guide](https://planetscale.com/docs/tutorials/connect-go-gorm-app).
