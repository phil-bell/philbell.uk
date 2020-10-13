from subprocess import run
import typer

app = typer.Typer()


def start():
    run("sudo service postgresql start".split())
    run("qbittorrent-nox &", shell=True)
    run(
        "python manage.py runserver &",
        shell=True,
    )
    run("./node_modules/.bin/webpack --watch", shell=True)


if __name__ == "__main__":
    typer.run(start)
