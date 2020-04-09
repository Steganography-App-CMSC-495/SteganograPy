from PIL import Image


def str2binary(string):
    """Returns the binary string of the input string"""
    return ''.join(format(ord(i), 'b').zfill(8) for i in string)


def binary2str(binary):
    """Returns the string representatin of the binary data"""
    str_data = ''
    for i in range(0, len(binary), 8):
        str_data += chr(int(binary[i:i+8], 2))
    return str_data


def getImageData(imagePath):
    """ Opens the image at imagePath, compiles
        the data into a dictionary and returns"""
    with Image.open(imagePath) as img:
        data = list(img.getdata())
        return {'width': img.size[0],
                'height': img.size[1],
                'pixels': [[img.getpixel((x, y))
                            for x in range(img.size[0])]
                           for y in range(img.size[1])]}


def saveImage(data, path='./image.png'):
    """ Saves an image to disk using data
    retrieving/modified from loadImage """
    with Image.new("RGBA", (data['width'], data['height'])) as img:
        img.putdata([data['pixels'][x][y]
                     for x in range(data['width'])
                     for y in range(data['height'])])
        img.save(path)
