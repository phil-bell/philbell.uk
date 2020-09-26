from subprocess import run
import typer

app = typer.Typer()


def start():
    run("python manage.py runserver & webpack --watch", shell=True)


if __name__ == "__main__":
    typer.run(start)