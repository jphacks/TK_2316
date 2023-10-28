package models

import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
)

var DB *gorm.DB

func ConnectDatabase() {
    dsn := "myUser:myPassword@tcp(localhost:3306)/myDatabase?charset=utf8mb4&parseTime=True&loc=Local"
    database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

    if err != nil {
        panic("Failed to connect to database!")
    }

    DB = database
}

type Ranking struct {
    ID            uint   `json:"id" gorm:"primary_key"`
    Name          string `json:"name"`       // ユーザー名
    SadisticScore int    `json:"sets"`       // サディスティックスコア
}

func Migrate() {
    DB.AutoMigrate(&Ranking{})
}

func GetRanking() ([]Ranking, error) {
    var rankings []Ranking
    err := DB.Order("sadistic_score desc").Find(&rankings).Error
    return rankings, err
}







