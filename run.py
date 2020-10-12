from subprocess import run
import typer

app = typer.Typer()


def start():
    run(
        "sudo service postgresql start && nohup qbittorrent-nox & python manage.py runserver & ./node_modules/.bin/webpack --watch",
        shell=True,
    )


if __name__ == "__main__":
    typer.run(start)
