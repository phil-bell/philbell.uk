#!/usr/bin/env python
from subprocess import run
from threading import Thread


def postgresql():
    run("sudo service postgresql start".split())


def qbittorrent():
    run("qbittorrent-nox".split())


def django():
    run("python manage.py runserver".split())


def django_prod():
    run("python manage.py runserver 0.0.0.0:8000".split())


def webpack():
    run("npm run watch".split())


def migrate():
    run("python manage.py makemigrations".split())
    run("python manage.py migrate".split())


def format():
    run("black . --line-length 99".split())
    run("npm run prettier".split())


def start():
    postgresql()
    Thread(target=qbittorrent).start()
    Thread(target=django).start()
    Thread(target=webpack).start()


def start_prod():
    Thread(target=django_prod).start()
    Thread(target=webpack).start()
