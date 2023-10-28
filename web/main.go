package main

import (
	"/win-dir/my-gin-app/TK_2316/web/models/models.go"
	"/win-dir/my-gin-app/TK_2316/web/routes/routes.go"
)

func main() {

	models.ConnectDatabase()

    models.Migrate()

	r := routes.SetupRouter()

	r.Run()
}
