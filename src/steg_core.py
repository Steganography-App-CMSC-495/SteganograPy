from PIL import Image
import copy


def str2binary(string):
    """Returns the binary string of the input string"""
    # Must encode input string into utf-8 for valid decoding
    # After that, per byte that encode returns, format it into
    # binary and make sure it is zero padding to 8 bits
    # then join the list back together into a series of bits
    return ''.join('{:b}'.format(b).zfill(8)
                   for b in string.encode('utf-8', 'replace'))


def binary2str(binary):
    """Returns the string representatin of the binary data"""
    # Splits bits into series of 8, compiles a list of
    # series of 8 bit strings, converts them to a decimal number
    # and puts the entire list of numbers into a bytes object
    # this then can be decoded into valid utf-8 from here
    str_data = bytes([int(x, 2)
                      for x in [binary[i:i+8]
                                for i in range(0, len(binary), 8)
                                ]
                      ])

    return str_data.decode('utf-8', 'replace')


def getImageData(imagePath):
    """ Opens the image at imagePath, compiles
        the data into a dictionary and returns"""
    with Image.open(imagePath) as img:
        data = list(img.getdata())
        return {'width': img.size[0],
                'height': img.size[1],
                'pixels': [[list(img.getpixel((x, y)))
                            for x in range(img.size[1])]
                           for y in range(img.size[0])],
                'bands': img.getbands()
                }


def cloneImageData(data):
    """ Utility function to clone image data for  manipulation """
    return copy.deepcopy(data)


def saveImage(data, path='./image.png'):
    """ Saves an image to disk using data
    retrieving/modified from loadImage """
    with Image.new("".join(data['bands']), (data['width'], data['height'])) as img:
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
    if len(msg) > getEvenOddMessageLimit(_data):
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
        if compIndex == len(data['bands']):
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
                  for comp in range(len(data['bands']))]

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
    if dataA['bands'] != dataB['bands']:
        raise RuntimeError('Comparing image data must use the same bands')

    data = [[[int(abs(dataA['pixels'][y][x][compIndex]
                      - dataB['pixels'][y][x][compIndex]) * scale)
              for compIndex in range(len(dataA['bands']))]
             for x in range(dataA['width'])]
            for y in range(dataA['height'])]

    img_data = cloneImageData(dataA)
    img_data['pixels'] = data

    return img_data
