package controllers

import (
    "net/http"
    "web/models"
    "github.com/gin-gonic/gin"
)

func GetRanking(c *gin.Context) {
    rankings, err := models.GetRanking()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch ranking", "details": err.Error()})
        return
    }
    c.HTML(http.StatusOK, "ranking.html", gin.H{"users": rankings})
}

func PostRanking(c *gin.Context) {
    var newRanking models.Ranking

    // JSONデータをnewRanking構造体にバインド
    if err := c.BindJSON(&newRanking); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
        return
    }

    // 新しいランキングをデータベースに保存または更新
    err := models.UpdateOrCreateRanking(&newRanking)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update or create ranking", "details": err.Error()})
        return
    }

    // 成功のレスポンスを送信
    c.JSON(http.StatusOK, newRanking)
}
