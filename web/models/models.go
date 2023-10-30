package models

import (
    "fmt"
    "github.com/spf13/viper"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

type Ranking struct {
    ID            uint   `json:"id" gorm:"primary_key"`
    Name          string `json:"name"`       // ユーザー名
    SadisticScore int    `json:"sadistic_score"`       // サディスティックスコア
}

func ConnectDatabase() error {  // 戻り値の型をerrorに変更
    // Configからデータベース接続情報を取得
    username := viper.GetString("database.username")
    password := viper.GetString("database.password")
    dbname := viper.GetString("database.dbname")
    host := viper.GetString("database.host")
    port := viper.GetInt("database.port")

    // DSN (Data Source Name) を作成
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local", username, password, host, port, dbname)

    // データベースに接続
    database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        return fmt.Errorf("failed to connect to database: %w", err)  // エラーメッセージを返す
    }

    DB = database
    return nil  // エラーがなければnilを返す
}
func Migrate() {
    DB.AutoMigrate(&Ranking{})
}

func GetRanking() ([]Ranking, error) {
    var rankings []Ranking
    err := DB.Order("sadistic_score desc").Find(&rankings).Error
    return rankings, err
}

func UpdateOrCreateRanking(ranking *Ranking) error {
    err := DB.Where("name = ?", ranking.Name).FirstOrCreate(ranking).Error
    return err
}
