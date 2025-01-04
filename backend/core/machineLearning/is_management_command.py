import sys


def is_management_command():
    """Check if the current process is running a management command."""
    if len(sys.argv) > 1 and sys.argv[0].endswith("manage.py"):
        management_commands = [
             "makemigrations", "migrate", "shell", "test", "createsuperuser",
        ]
        return sys.argv[1] in management_commands
    return False