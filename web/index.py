import pymysql

def get_column_names(host, port, user, password, dbname, table_name):
    connection = pymysql.connect(
        host=host,
        port=port,
        user=user,
        password=password,
        database=dbname
    )

    try:
        with connection.cursor() as cursor:
            query = f"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '{dbname}' AND TABLE_NAME = '{table_name}';"
            cursor.execute(query)
            result = cursor.fetchall()
            columns = [column[0] for column in result]
            return columns
    finally:
        connection.close()

# YAMLファイルから設定を読み込みます（この例では直接指定しています）
database_config = {
    "host": "localhost",
    "port": 3306,
    "username": "shiori-42",
    "password": "shiorin",
    "dbname": "myDatabase"
}

table_name = "rankings"  # あなたのテーブル名に変更してください
columns = get_column_names(
    database_config["host"],
    database_config["port"],
    database_config["username"],
    database_config["password"],
    database_config["dbname"],
    table_name
)

print("Column names:", columns)

