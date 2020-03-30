import os

from stegano import lsb

THIS_FOLDER = os.path.dirname(os.path.abspath(__file__))


def get_image():
    my_file = os.path.join(
        THIS_FOLDER, "./../assets/images/pull_request_ex.png")
    return my_file


def hide_message(my_file):
    secret = lsb.hide(my_file, 'Hello class')
    secret.save('newimg.png')


def reveal_message():
    print(lsb.reveal('newimg.png'))


if __name__ == "__main__":
    image = get_image()
    hide_message(image)
    reveal_message()
