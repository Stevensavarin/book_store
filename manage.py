#from flask_script import Manager
from app import inicializar_app
from config import config


configuracion = config["development"]
app = inicializar_app(configuracion)


#manager = Manager(app)

if __name__ == "__main__":
    puerto = 5000
    app.run(port=puerto)
    #app.run()