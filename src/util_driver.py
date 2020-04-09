import steg_core as core


def runStringConversionTest():
    print('*** String-Binary conversion testing ***\n')
    test = 'This is a conversion test! With @ 123--987.0'
    test_bin = core.str2binary(test)
    test_conv = core.binary2str(test_bin)

    print(f'Test string is {test}')
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
    for x in range(data['width']):
        for y in range(data['height']):
            print(data['pixels'][x][y])


def runImageSavingTest(data):
    print('\n*** Image Save testing ***\n')
    data['width'] *= 2
    data['height'] *= 2
    data['pixels'] = [[data['pixels'][int(x / 2)][int(y / 2)]
                       for x in range(data['width'])]
                      for y in range(data['height'])]
    printImageData(data)
    core.saveImage(data, './assets/images/bigger_pixel_test.png')



if __name__ == '__main__':
    runStringConversionTest()
    data = runImagePixelExtractionTest()
    runImageSavingTest(data)
