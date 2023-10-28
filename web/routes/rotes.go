package routes

import (
	
	"web/controllers"
	"github.com/gin-gonic/gin"
)

var customFuncs = template.FuncMap{
	"add": func(a, b int) int {
		return a + b
	},
}

func SetupRouter() *gin.Engine {
	r := gin.Default()
	
	
	r.SetFuncMap(customFuncs)

	r.Static("/static", "./static")
	r.LoadHTMLGlob("views/*")

	r.GET("/ranking", controllers.GetRanking)
	return r
}
