package controllers

import (
    "net/http"
    "web/models"
    "github.com/gin-gonic/gin"
)


func GetRanking(c *gin.Context) {
    rankings, err := models.GetRanking()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch ranking"})
        return
    }
    c.HTML(http.StatusOK, "ranking.html", gin.H{"users": rankings})
}






