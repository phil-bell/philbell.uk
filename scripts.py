#!/usr/bin/env python
from subprocess import run as _run
from threading import Thread


def run(command):
    _run(command.split())

def kill_prod():
    run("killall uwsgi")


def postgresql():
    run("sudo service postgresql start")


def qbittorrent():
    run("qbittorrent-nox")


def django():
    run("python manage.py runserver")


def django_prod():
    run("poetry run uwsgi --socket :8001 --module app.wsgi --threads 4 --chmod-socket=666 --daemonize logs/uwsgi.logs")


def webpack():
    run("npm run watch")


def migrate():
    run("python manage.py makemigrations")
    run("python manage.py migrate")


def format():
    run("black . --line-length 99")
    run("npm run prettier")


def git():
    run("git pull")


def nginx():
    run("sudo /etc/init.d/nginx restart")


def collectstatic():
    run("python manage.py collectstatic --noinput -v 3")


def npm():
    run("npm i")
    run("npm run build")


def poetry():
    run("poetry install")


def start_prod():
    Thread(target=django_prod).start()


def deploy_prod():
    git()
    poetry()
    migrate()
    npm()
    collectstatic()
    kill_prod()
    start_prod()
    nginx()


def start():
    postgresql()
    Thread(target=qbittorrent).start()
    Thread(target=django).start()
    Thread(target=webpack).start()

