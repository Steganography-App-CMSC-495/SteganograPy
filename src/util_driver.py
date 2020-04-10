import steg_core as core


def runStringConversionTest():
    print('*** String-Binary conversion testing ***\n')
    test = 'This is a conversion test! With @ 123--987.0'
    test_bin = core.str2binary(test)
    test_conv = core.binary2str(test_bin)

    print(f'Test string: {test}')
    print(f'In binary, that is {test_bin}')
    print(f'And converted back into Unicode: {test_conv}')


def runImagePixelExtractionTest():
    print('\n*** Image Pixel Extraction testing ***\n')

    data = core.getImageData('./assets/images/pixel_test.png')
    printImageData(data)
    return data


def printImageData(data):
    print(f"Image is {data['width']} pixels wide "
          f"and {data['height']} pixels high")
    print('Pixel data:')
    print(f"Bands: {data['bands']}")
    for y in range(data['height']):
        for x in range(data['width']):
            print(data['pixels'][y][x])


def runImageSavingTest(_data):
    print('\n*** Image Save testing ***\n')
    data = core.cloneImageData(_data)
    # this just doubles the size of the image
    data['width'] *= 2
    data['height'] *= 2
    data['pixels'] = [[data['pixels'][int(y / 2)][int(x / 2)]
                       for x in range(data['width'])]
                      for y in range(data['height'])]
    printImageData(data)
    core.saveImage(data, './assets/images/bigger_pixel_test.png')
    print('Image saved to assets/images/bigger_pixel_test.png')
    return data


def runImageEncryption(data, msg):
    print('\n*** Image Encryption testing ***\n')
    print(f'Secret message: {msg}')
    enc_data = core.evenOddEncryption(data, msg)
    core.saveImage(enc_data, './assets/images/encrypted.png')
    print('File saved to assets/images/encrypted.png')
    return enc_data


def generateDifferenceImage(dataA, dataB, scale=1):
    print('\n*** Difference Image Generating ***\n')
    diff_data = core.getDifferenceData(data, enc_data, scale)
    core.saveImage(diff_data, './assets/images/diff.png')
    print('Difference image saved to /assets/images/diff.png')


def runImageDecryption(data):
    print('\n*** Image Decryption testing ***\n')
    msg = core.evenOddDecryption(data)
    print(f'Decryption message is:\n{msg}')
    return msg


if __name__ == '__main__':

    runStringConversionTest()
    runImageSavingTest(runImagePixelExtractionTest())

    data = core.getImageData(
        './assets/images/lowres_image.png')
    secret = 'We are what we repeatedly do.' \
        ' Excellence, then, is not an act,' \
        ' but a habit. - Aristotle'
    enc_data = runImageEncryption(data, secret)
    generateDifferenceImage(data, enc_data, scale=150)

    # grabs new image data because this is how the library will
    # most likely be used
    dec_secret = runImageDecryption(core.getImageData(
        './assets/images/encrypted.png'))

    print(f'Secret equal to decrypted secret: {secret == dec_secret}')
