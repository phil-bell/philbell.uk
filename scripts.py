from subprocess import run
from threading import Thread

def postgresql():
    run("sudo service postgresql start".split())

def qbittorrent():
    run("qbittorrent-nox".split())

def django():
    run("python manage.py runserver".split())

def webpack():
    run("npm run watch".split())

def start():
    postgresql()
    Thread(target=qbittorrent).start()
    Thread(target=django).start()
    Thread(target=webpack).start()
