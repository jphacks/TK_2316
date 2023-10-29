package main

import (
	"log"
	"web/models"
	"web/routes"

	"github.com/spf13/viper"
)

func initConfig() error {
	viper.SetConfigName("config") // 設定ファイルの名前（拡張子なし）
	viper.AddConfigPath("./")    // 設定ファイルのパスを追加
	return viper.ReadInConfig()   // 設定ファイルを読み込む
}

func main() {
	err := initConfig() // 設定を初期化
	if err != nil {
		log.Fatalf("Fatal error config file: %s", err)
	}

	host := viper.GetString("server.host") // 設定からホストを取得
	port := viper.GetInt("server.port")    // 設定からポートを取得

	log.Println(host, port) // 値をロギング

	err = models.ConnectDatabase()
	if err != nil {
		log.Fatalf("Could not connect to database: %v", err)
	}

	models.Migrate()

	r := routes.SetupRouter()

	r.Run()
}
