from decouple import config

class Config:
    SECRET_KEY = "your_secret_key"

class DevelepmentConfig(Config):
    DEBUG=True
    MYSQL_HOST = "localhost"
    MYSQL_USER = "root"
    MYSQL_PASSWORD = config("MYSQL_PASSWORD")
    MYSQL_DB = "tienda"
    MAIL_SERVER = config("MAIL_SERVER")
    MAIL_PORT = 587 #TLS
    MAIL_USE_TLS = True
    MAIL_USERNAME = config("MAIL_USERNAME")
    MAIL_PASSWORD = config("MAIL_PASSWORD")

config ={
    "development": DevelepmentConfig,
    "default": DevelepmentConfig
}
