from subprocess import run
import typer

app = typer.Typer()


def start():
    run("sudo lsof -t -i tcp:8000 | xargs kill -9", shell=True)
    run("sudo service postgresql start".split())
    run("qbittorrent-nox &", shell=True)
    run(
        "python manage.py runserver &", shell=True,
    )
    run("./node_modules/.bin/webpack --watch", shell=True)


if __name__ == "__main__":
    typer.run(start)
