package main

import (
		"web/models"
		"web/routes"
)

func main() {

	models.ConnectDatabase()

    models.Migrate()

	r := routes.SetupRouter()

	r.Run()
}
