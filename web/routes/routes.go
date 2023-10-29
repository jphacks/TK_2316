package routes

import (
    "web/models"
    "net/http"
    "web/controllers"
    "github.com/gin-gonic/gin"
)


func SetupRouter() *gin.Engine {
    r := gin.Default()

    r.Static("/static", "./static")
    r.LoadHTMLGlob("views/*")

    r.GET("/ranking", controllers.GetRanking)
    r.POST("/ranking", controllers.PostRanking)

    r.POST("/update-or-create-ranking", func(c *gin.Context) {
		var ranking models.Ranking
		if err := c.ShouldBindJSON(&ranking); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := models.UpdateOrCreateRanking(&ranking)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Ranking updated or created successfully!"})
	})


    return r
}


