#!/usr/bin/env python
from subprocess import run as _run()
from threading import Thread

def run(command):
    _run(commmand.split())

def postgresql():
    run("sudo service postgresql start")


def qbittorrent():
    run("qbittorrent-nox")


def django():
    run("python manage.py runserver")


def django_prod():
    run("uwsgi --http :8000 --module app.wsgi --enable-threads")


def webpack():
    run("npm run watch")


def migrate():
    run("python manage.py makemigrations")
    run("python manage.py migrate")


def format():
    run("black . --line-length 99")
    run("npm run prettier")


def start():
    postgresql()
    Thread(target=qbittorrent).start()
    Thread(target=django).start()
    Thread(target=webpack).start()


def start_prod():
    Thread(target=django_prod).start()
    Thread(target=webpack).start()
