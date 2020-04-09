from PIL import Image
import copy


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
                'pixels': [[list(img.getpixel((x, y)))
                            for x in range(img.size[1])]
                           for y in range(img.size[0])]}


def cloneImageData(data):
    """ Utility function to clone image data for  manipulation """
    return copy.deepcopy(data)


def saveImage(data, path='./image.png'):
    """ Saves an image to disk using data
    retrieving/modified from loadImage """
    with Image.new("RGBA", (data['width'], data['height'])) as img:
        img.putdata([tuple(data['pixels'][y][x])
                     for y in range(data['height'])
                     for x in range(data['width'])])
        img.save(path)


def getEvenOddMessageLimit(data):
    """ Calculates how many characters the image can contain
    using even odd encryption """
    return int(data['width'] * data['height'] * 3 / 9)


def evenOddEncryption(_data, msg):
    """ Encrypts the msg into the image data by offsetting the color
     by whether the bit is even or odd to make color component
     even or odd """
    binary = str2binary(msg)
    # make sure there are enough bytes in the data for this msg
    if len(binary) > getEvenOddMessageLimit(_data):
        raise RuntimeError('There is not enough image '
                           'bytes to represent the message.')

    # make copy of _data so that the original data isn't changed
    data = cloneImageData(_data)

    # fix binary string to use 9 bits instead of 8 with
    # the 9th being if the message continues (0) or not (1)

    _bin = ''
    for bits in range(0, len(binary), 8):
        _bin += binary[bits:bits+8] + '0'
    binary = _bin[:len(_bin)-1] + '1'

    compIndex = 0
    x = 0
    y = 0

    for bit in binary:
        val = data['pixels'][y][x][compIndex]
        if bit == '0':
            # make sure pixel data is even
            if val % 2 != 0:
                if val < 128:
                    val += 1
                else:
                    val -= 1
        else:
            # make sure pixel data is odd
            if val % 2 == 0:
                if val < 128:
                    val += 1
                else:
                    val -= 1

        # reassign value back into pixel list
        data['pixels'][y][x][compIndex] = val

        # move along component/pixel data
        compIndex += 1
        if compIndex == 3:
            compIndex = 0
            x += 1
            if (x == data['width']):
                x = 0
                y += 1

    return data


def evenOddDecryption(data):
    """ Attempts to extract a message from the image data """
    # first, build flat representation of image
    components = [data['pixels'][y][x][comp]
                  for y in range(data['height'])
                  for x in range(data['width'])
                  for comp in range(0, 3)]

    binary = ''

    # now it is a list of component values
    # compile a binary even odd interpretation
    done = False
    for i in range(0, len(components), 9):
        if done:
            break
        for j in range(0, 9):
            # make sure a value exists (out of bounds)
            if (i + j < len(components)):
                val = components[i+j]
                if j == 8:
                    # end of message detection
                    # don't add onto binary here since
                    # 9th bit not part of message
                    if val % 2 != 0:
                        done = True
                else:
                    if val % 2 == 0:
                        binary += '0'
                    else:
                        binary += '1'
            else:
                break

    return binary2str(binary)


def getDifferenceData(dataA, dataB, scale=50):
    """ Returns a new data object comprised of the byte differences
     between the color information for validation purposes.
     Scale can be used to debug the difference image, lightening
     the colors for visibility """
    if ((dataA['width'] != dataB['width']) or
            (dataA['height'] != dataB['height'])):
        raise RuntimeError(
            'Comparing image data must have same sizes')
    data = [[[int(abs(dataA['pixels'][y][x][compIndex]
                      - dataB['pixels'][y][x][compIndex]) * scale)
              for compIndex in range(0, 3)]
             for x in range(dataA['width'])]
            for y in range(dataA['height'])]

    return {'width': dataA['width'],
            'height': dataA['height'],
            'pixels': data}
